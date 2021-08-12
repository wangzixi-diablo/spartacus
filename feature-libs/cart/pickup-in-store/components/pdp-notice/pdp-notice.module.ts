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
import { PdpNoticeComponent } from './pdp-notice.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    UrlModule,
    IconModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductPdpNoticeComponent: {
          component: PdpNoticeComponent,
        },
      },
    }),
  ],
  exports: [PdpNoticeComponent],
  declarations: [PdpNoticeComponent],
  entryComponents: [PdpNoticeComponent],
})
export class PdpNoticeModule {}
