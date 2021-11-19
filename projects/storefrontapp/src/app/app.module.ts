import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeJa from '@angular/common/locales/ja';
import localeZh from '@angular/common/locales/zh';
import { NgModule, Injector } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { translationChunksConfig, translations } from '@spartacus/assets';
import { I18nModule,UrlModule, Config, LanguageService } from '@spartacus/core';

import {
  FeaturesConfig,
  I18nConfig,
  OccConfig,
  provideConfig,
  //RoutingConfig,
  TestConfigModule
} from '@spartacus/core';
import { AppRoutingModule, StorefrontComponent, DirectionConfig, DirectionMode } from '@spartacus/storefront';
import { environment } from '../environments/environment';
import { TestOutletModule } from '../test-outlets/test-outlet.module';
import { SpartacusModule } from './spartacus/spartacus.module';
import { Router, RouterModule } from '@angular/router';
import { JerryComponent } from './jerry.component';
import { CustomCacheInterceptor } from '../jerryExt/custom-http.interceptor';
//import { MyLibService } from 'jerry/mylib';

import { TestLibService } from 'test-lib';
import { JerryOrderRootModule } from './jerryQuickOrder/jerry-order.module';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { ChildComponent } from './child.component';
// import { Exams } from 'first';

registerLocaleData(localeDe);
registerLocaleData(localeJa);
registerLocaleData(localeZh);

const devImports = [];
if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'spartacus-app' }),
    BrowserTransferStateModule,
    FormsModule,
    I18nModule,
    UrlModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
    JerryOrderRootModule,
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
  declarations: [JerryComponent, ChildComponent],
  providers: [
    provideConfig(<OccConfig>{
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl,
          prefix: environment.occApiPrefix,
        },
      },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: CustomCacheInterceptor,
    },
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
        level: '4.2'
      },
    }),
    provideConfig(<DirectionConfig>{
      direction: {
        default: DirectionMode.LTR,
        rtlLanguages: ['zh'],
    }
    }),
  ],
  bootstrap: [StorefrontComponent],
})
export class AppModule {
  constructor(private router: Router,protected injector: Injector,
    private myLibService: TestLibService,
    private languageService: LanguageService,
    private config: Config
    ){
      this.languageService
        .getActive()
        .subscribe((isoCode: string) =>
          console.log('Jerry language: ', isoCode));

      console.log('Jerry global config: ', this.config);
    this.router.events.subscribe((data) => {
      console.log('Jerry route event: ', data);
    });

    const routeConfig: Router = this.injector.get(Router);
    console.log('Jerry Route config: ', routeConfig);

    this.myLibService.hello();

    const result = injector.get(QuickOrderFacade);
    console.log('Jerry Facade result: ', result.getEntries());
  }
}
