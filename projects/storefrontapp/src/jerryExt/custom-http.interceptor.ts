import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

const CACHE = new Map<string, any>();

@Injectable()
export class CustomCacheInterceptor implements HttpInterceptor {

  constructor(){
    console.log('Jerry Custom interceptor is called!');
  }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { method, urlWithParams } = request;

    if (!['GET', 'HEAD'].includes(method)) {
      console.log(':sad_face: CANNOT cache:', method, urlWithParams);
      return next.handle(request);
    }
    const cached = CACHE.get(`${method}_${urlWithParams}`);
    if (cached) {
      return of(cached);
    }

    return next.handle(request).pipe(
      switchMap((response) => {
        if (
          response.type === HttpEventType.Response &&
          response instanceof HttpResponse &&
          response.status >= 200 &&
          response.status < 400
        ) {
            console.log('Jerry Interceptor ADD to cache:', method, urlWithParams, ' for response: ', response);
            CACHE.set(`${method}_${urlWithParams}`, response);
        }
        return of(response);
      })
    );
  }
}
