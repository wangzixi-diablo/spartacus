import { NgModule } from '@angular/core';
import {
  DeliveryPickupOptionsModule,
  PdpNoticeModule,
} from '@spartacus/cart/pickup-in-store/components';

@NgModule({
  imports: [PdpNoticeModule, DeliveryPickupOptionsModule],
})
export class PickupInStoreModule {}
