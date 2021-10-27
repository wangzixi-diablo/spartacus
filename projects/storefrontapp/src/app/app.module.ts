import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeJa from '@angular/common/locales/ja';
import localeZh from '@angular/common/locales/zh';
import { NgModule, Injector } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { translationChunksConfig, translations } from '@spartacus/assets';
import {
  FeaturesConfig,
  I18nConfig,
  OccConfig,
  provideConfig,
  //RoutingConfig,
  TestConfigModule,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { AppRoutingModule, StorefrontComponent } from '@spartacus/storefront';
import { environment } from '../environments/environment';
import { TestOutletModule } from '../test-outlets/test-outlet.module';
import { SpartacusModule } from './spartacus/spartacus.module';
import { Router, RouterModule } from '@angular/router';
import { JerryComponent } from './jerry.component';

registerLocaleData(localeDe);
registerLocaleData(localeJa);
registerLocaleData(localeZh);

export function jerryConfigFactory(): any {
  return {
    configJerryUIDebug: true
  };
}

const devImports = [];
if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'spartacus-app' }),
    BrowserTransferStateModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
    TestOutletModule, // custom usages of cxOutletRef only for e2e testing
    TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.

    ...devImports,
    RouterModule.forChild([
      {
        path: 'jerry',
        component: JerryComponent
      },
    ])
  ],
  providers: [
    provideDefaultConfigFactory(jerryConfigFactory),
    provideConfig(<OccConfig>{
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl,
          prefix: environment.occApiPrefix,
        },
      },
    }),
    /*
    provideConfig(<RoutingConfig>{
      // custom routing configuration for e2e testing
      routing: {
        routes: {
          product: {
            paths: ['product/:productCode/:name', 'product/:productCode'],
            paramsMapping: { name: 'slug' },
          },
        },
      },
    }),*/
    provideConfig(<I18nConfig>{
      // we bring in static translations to be up and running soon right away
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<FeaturesConfig>{
      features: {
        level: '4.0',
      },
    }),
  ],
  bootstrap: [StorefrontComponent],
})
export class AppModule {
  constructor(private router: Router,protected injector: Injector){
    this.router.events.subscribe((data) => {
      console.log('Jerry route event: ', data);
    });

    const routeConfig: Router = this.injector.get(Router);
    console.log('Jerry Route config: ', routeConfig);
  }
}
