import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from '@spartacus/storefront';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { DeliveryPickupOptionsComponent } from './delivery-pickup-options.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    UrlModule,
    IconModule,
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
})
export class DeliveryPickupOptionsModule {}
