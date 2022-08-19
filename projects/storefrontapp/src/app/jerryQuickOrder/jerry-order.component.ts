import { Component } from "@angular/core";

@Component({
    selector: 'jerryorder',
    templateUrl: './jerry-order.component.html'

  })
export class JerryOrderComponent{
  title = 'orbeonPOC';
  app = 'orbeon';
  form = 'controls';

  loadForm(app: string, form: string): void {
    console.log('Jerry load:', app);
    this.app  = app;
    this.form = form;
}}
