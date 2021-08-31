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
    // properties: {
    //   component: 'coolio',
    //   appData: { coolio: 'cool', ok: { hi: 'bye' } },
    //   who: ['1', '2', ['stuff', 'nested']],
    //   emptyA: [],
    //   emptyO: {},
    // },

    // properties: 'a',
    // nopeee
    // properties: 1,

    // properties: [],
    // properties: ['who'],
    // properties: ['who', ['what', 'where']],

    // properties: {},
    // properties: { ok: 'bye' },
  };
}
