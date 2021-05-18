import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { TabModule } from 'projects/storefrontlib/src/cms-components/content/tab/tab.module';
import { KeyboardFocusModule } from '../../../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { IconModule } from '../../../../misc/icon/icon.module';
import { FacetModule } from '../facet/facet.module';
import { FacetListComponent } from './facet-list.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    FacetModule,
    KeyboardFocusModule,
    TabModule,
  ],
  declarations: [FacetListComponent],
  exports: [FacetListComponent],
})
export class FacetListModule {}
