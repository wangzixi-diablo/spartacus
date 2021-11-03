import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  RoutingConfig,
  CmsConfig,
} from '@spartacus/core';
import { JerryOrderComponent } from './jerry-order.component';

export const defaultJerryOrderRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      quickOrder: {
        paths: ['my-account/jerry-order'],
      },
    },
  },
};

@NgModule({
  imports: [],
  declarations:[JerryOrderComponent],
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
