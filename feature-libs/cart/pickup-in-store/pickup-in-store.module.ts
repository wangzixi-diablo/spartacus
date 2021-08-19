import { NgModule } from '@angular/core';
import {
  DeliveryPickupOptionsModule,
  PdpNoticeModule,
} from '@spartacus/cart/pickup-in-store/components';
import { PickupInStoreCoreModule } from '@spartacus/cart/pickup-in-store/core';

@NgModule({
  imports: [
    PickupInStoreCoreModule.forRoot(),
    PdpNoticeModule,
    DeliveryPickupOptionsModule,
  ],
})
export class PickupInStoreModule {}
