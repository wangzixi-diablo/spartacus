import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { DeliveryPickupOptionsModule } from '../components/delivery-pickup-options';
import { CART_PICKUP_IN_STORE_FEATURE } from './feature-name';

@NgModule({
  imports: [DeliveryPickupOptionsModule],
  providers: [
    provideDefaultConfig({
      featureModules: {
        [CART_PICKUP_IN_STORE_FEATURE]: {
          cmsComponents: ['ProductPdpNoticeComponent'],
        },
      },
    }),
  ],
})
export class PickupInStoreRootModule {}
