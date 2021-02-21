import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthStorageService } from './auth-storage.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';

/**
 * Extendable service for `AuthInterceptor`.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthHttpHeaderService {
  constructor(
    protected authService: AuthService,
    protected authStorageService: AuthStorageService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected routingService: RoutingService,
    protected occEndpoints: OccEndpointsService,
    protected globalMessageService: GlobalMessageService
  ) {}

  /**
   * Checks if request should be handled by this service (if it's OCC call).
   */
  public shouldCatchError(request: HttpRequest<any>): boolean {
    return this.isOccUrl(request.url);
  }

  /**
   * Adds `Authorization` header for OCC calls.
   */
  public alterRequest(request: HttpRequest<any>): HttpRequest<any> {
    const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
    const isOccUrl = this.isOccUrl(request.url);
    if (!hasAuthorizationHeader && isOccUrl) {
      return request.clone({
        setHeaders: {
          ...this.createAuthorizationHeader(),
        },
      });
    }
    return request;
  }

  protected isOccUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint());
  }

  protected isCMSUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint() + '/cms/');
  }

  protected getAuthorizationHeader(request: HttpRequest<any>): string | null {
    return request.headers.get('Authorization');
  }

  protected createAuthorizationHeader(): { Authorization: string } | {} {
    let token: AuthToken | undefined;
    this.authStorageService
      .getToken()
      .subscribe((tok) => (token = tok))
      .unsubscribe();

    if (token?.access_token) {
      return {
        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
      };
    }
    return {};
  }

  /**
   * Refreshes access_token and then retries the call with the new token.
   */
  public handleExpiredAccessToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<AuthToken> | never> {
    const isCMSRequest = this.isCMSUrl(request.urlWithParams);
    return this.handleExpiredToken(!isCMSRequest).pipe(
      switchMap((token: AuthToken | undefined) => {
        const req = this.createNewRequestWithNewToken(request, token);
        if (req) {
          return next.handle(req);
        }
        return EMPTY;
      })
    );
  }

  /**
   * Logout user, redirected to login page and informs about expired session.
   */
  public handleExpiredRefreshToken(redirectToLogin = true): void {
    // Logout user
    // TODO(#9638): Use logout route when it will support passing redirect url
    this.authService.coreLogout();
    if (redirectToLogin) {
      this.routingService.go({ cxRoute: 'login' });
    }
    this.globalMessageService.add(
      {
        key: 'httpHandlers.sessionExpired',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  /**
   * Attempts to refresh token if possible.
   * If it is not possible calls `handleExpiredRefreshToken`.
   *
   * @return observable which omits new access_token. (Warn: might never emit!).
   */
  protected handleExpiredToken(
    redirectToLogin = true
  ): Observable<AuthToken | undefined> {
    const stream = this.authStorageService.getToken();
    let oldToken: AuthToken;
    return stream.pipe(
      tap((token: AuthToken) => {
        if (token.access_token && token.refresh_token && !oldToken) {
          this.oAuthLibWrapperService.refreshToken();
        } else if (!token.refresh_token) {
          this.handleExpiredRefreshToken(redirectToLogin);
        }
        oldToken = oldToken || token;
      }),
      filter(
        (token: AuthToken) => oldToken.access_token !== token.access_token
      ),
      // When the `handleExpiredRefreshToken` will be invoked
      // then token will be revoked and the token received here won't be new, but emptied (properties will be removed one by one).
      // eg. { access_token: 'abc', refresh_token: 'def' } -> { refresh_token: 'def' } -> {}
      map((token: AuthToken) => (token.access_token ? token : undefined)),
      take(1)
    );
  }

  protected createNewRequestWithNewToken(
    request: HttpRequest<any>,
    token: AuthToken | undefined
  ): HttpRequest<any> | void {
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `${token.token_type || 'Bearer'} ${
            token.access_token
          }`,
        },
      });
    }
  }
}
