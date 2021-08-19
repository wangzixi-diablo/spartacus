import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultPickupInStoreConfig } from './config/default-pickup-in-store-config';

@NgModule({})
export class PickupInStoreCoreModule {
  static forRoot(): ModuleWithProviders<PickupInStoreCoreModule> {
    return {
      ngModule: PickupInStoreCoreModule,
      providers: [provideDefaultConfig(defaultPickupInStoreConfig)],
    };
  }
}
