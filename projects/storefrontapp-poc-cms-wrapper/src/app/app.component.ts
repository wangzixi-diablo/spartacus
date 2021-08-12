import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'storefrontapp-poc-cms-wrapper';

  testhello = {
    flexType: 'CMSParagraphComponent',
    typeCode: 'CMSParagraphComponent',
    uid: 'NoticeTextParagraph',
  };
}
