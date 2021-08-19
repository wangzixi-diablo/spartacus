import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import {
  CartOutlets,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { DeliveryPickupOptionsComponent } from './delivery-pickup-options.component';
@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CartDeliveryPickupOptionsComponent: {
          component: DeliveryPickupOptionsComponent,
        },
      },
    }),
  ],
  exports: [DeliveryPickupOptionsComponent],
  declarations: [DeliveryPickupOptionsComponent],
  entryComponents: [DeliveryPickupOptionsComponent],

  providers: [
    provideOutlet({
      id: CartOutlets.ITEM_BUNDLE_DETAILS,
      position: OutletPosition.AFTER,
      component: DeliveryPickupOptionsComponent,
    }),
  ],
})
export class DeliveryPickupOptionsModule {}
