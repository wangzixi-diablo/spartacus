import { Component, Input } from "@angular/core";

@Component({
    selector: 'jerryapp',
    templateUrl: './jerry.html'
  })
export class JerryComponent{
  public foo = "";

  @Input()
  set filter(filter: string) {
    console.log('Jerry filter is set: ', filter);
  }
}
