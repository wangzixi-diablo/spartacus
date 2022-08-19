import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  RoutingConfig,
  CmsConfig,
} from '@spartacus/core';
import { JerryOrderComponent } from './jerry-order.component';
import { FrFormComponent } from './fr-form.component';

export const defaultJerryOrderRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      quickOrderThisNameChanchange: {
        paths: ['my-account/jerry-order'],
      },
    },
  },
};

@NgModule({
  imports: [],
  declarations:[JerryOrderComponent, FrFormComponent],
  exports: [JerryOrderComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        JerryOrderComponent: {
          component: JerryOrderComponent,
        }
      }
    }),
    provideDefaultConfig(defaultJerryOrderRoutingConfig)
  ],
})
export class JerryOrderRootModule {}
