import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageComponentModule } from '@spartacus/cms';
import { provideDefaultConfig } from '@spartacus/core';
import { AppComponent } from './app.component';
import { TestparacomponentComponent } from './testparacomponent/testparacomponent.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PageComponentModule.forRoot()],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        CMSParagraphComponent: {
          component: TestparacomponentComponent,
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
