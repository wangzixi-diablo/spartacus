import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OutletModule } from '../../outlet/outlet.module';
import { PageComponentModule } from '../component/page-component.module';
import { PageSlotComponent } from './page-slot.component';
import { PageSlotService } from './page-slot.service';
import { ConfigUIDebug } from '../model/cms-component-data';
import { provideDefaultConfigFactory } from '@spartacus/core';

export function jerryConfigFactory(){
  const config: ConfigUIDebug = {
    switchOn:true
  };
  return config;
}

@NgModule({
  imports: [CommonModule, OutletModule, PageComponentModule],
  declarations: [PageSlotComponent],
  providers: [provideDefaultConfigFactory(jerryConfigFactory)],
  exports: [PageSlotComponent],
})
export class PageSlotModule {
  // instantiate PageSlotService ASAP, so it can examine SSR pre-rendered DOM
  constructor(_pageSlot: PageSlotService) {}
}
