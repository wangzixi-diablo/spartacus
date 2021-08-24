import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Config } from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { AppComponent } from './app.component';
import { TestparacomponentComponent } from './testparacomponent/testparacomponent.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PageComponentModule.forRoot()],
  providers: [
    {
      provide: Config,
      useValue: {
        cmsComponents: {
          CMSParagraphComponent: {
            component: TestparacomponentComponent,
          },
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
