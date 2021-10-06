import { NgModule } from '@angular/core';
import { CartConfig, provideConfig, SiteContextConfig } from '@spartacus/core';
import {
  defaultCmsContentProviders,
  layoutConfig,
  mediaConfig,
  PWAModuleConfig,
} from '@spartacus/storefront';

@NgModule({
  providers: [
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    provideConfig(<SiteContextConfig>{
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['cassinelli-spa'],
        language: ['es_PE'],
        currency: ['PEN'],
      },
    }),
    provideConfig(<PWAModuleConfig>{
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
    }),
    provideConfig(<CartConfig>{
      cart: {
        selectiveCart: {
          enabled: true,
        },
      },
    }),
  ],
})
export class SpartacusB2cConfigurationModule {}
