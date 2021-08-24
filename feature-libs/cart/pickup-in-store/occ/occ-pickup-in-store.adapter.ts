import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PickupInStoreAdapter } from '@spartacus/cart/pickup-in-store/core';
import {
  Cart,
  CART_NORMALIZER,
  ConverterService,
  Occ,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Injectable()
export class OccPickupInStoreAdapter implements PickupInStoreAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, cartId: string): Observable<Cart> {
    return this.http
      .get<Occ.Cart>(this.getPickupInStoreEndpoint(userId, cartId))
      .pipe(
        pluck('PickupInStoreData'),
        this.converter.pipeable(CART_NORMALIZER)
      );
  }

  loadList(userId: string): Observable<Cart[]> {
    return this.http
      .get<Occ.CartList>(this.getPickupInStoreListEndpoint(userId))
      .pipe(
        pluck('carts'),
        map((carts) => carts ?? []),
        this.converter.pipeableMany(CART_NORMALIZER)
      );
  }

  restorePickupInStore(userId: string, cartId: string): Observable<Cart> {
    return this.http
      .patch<Occ.Cart>(
        this.getRestorePickupInStoreEndpoint(userId, cartId),
        cartId
      )
      .pipe(
        pluck('PickupInStoreData'),
        this.converter.pipeable(CART_NORMALIZER)
      );
  }

  //   saveCart(
  //     userId: string,
  //     cartId: string,
  //     saveCartName: string,
  //     saveCartDescription: string
  //   ): Observable<Cart> {
  //     return this.http
  //       .patch<Occ.Cart>(
  //         this.getSaveCartEndpoint(
  //           userId,
  //           cartId,
  //           saveCartName,
  //           saveCartDescription
  //         ),
  //         cartId
  //       )
  //       .pipe(
  //         pluck('PickupInStoreData'),
  //         this.converter.pipeable(CART_NORMALIZER)
  //       );
  //   }

  //   clonePickupInStore(userId: string, cartId: string): Observable<Cart> {
  //     return this.http
  //       .post<Occ.Cart>(
  //         this.getClonePickupInStoreEndpoint(userId, cartId),
  //         cartId
  //       )
  //       .pipe(
  //         pluck('PickupInStoreData'),
  //         this.converter.pipeable(CART_NORMALIZER)
  //       );
  //   }

  protected getPickupInStoreEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.buildUrl('PickupInStore', {
      urlParams: { userId, cartId },
    });
  }

  protected getPickupInStoreListEndpoint(userId: string): string {
    return this.occEndpoints.buildUrl('PickupInStores', {
      urlParams: { userId },
    });
  }

  protected getRestorePickupInStoreEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('restorePickupInStore', {
      urlParams: { userId, cartId },
    });
  }

  protected getSaveCartEndpoint(
    userId: string,
    cartId: string,
    saveCartName: string,
    saveCartDescription: string
  ): string {
    return this.occEndpoints.buildUrl('saveCart', {
      urlParams: {
        userId,
        cartId,
        saveCartName,
        saveCartDescription,
      },
    });
  }

  protected getClonePickupInStoreEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('clonePickupInStore', {
      urlParams: { userId, cartId },
    });
  }
}
