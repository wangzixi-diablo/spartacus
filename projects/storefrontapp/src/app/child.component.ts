import { Component, Input } from "@angular/core";
// import { filter, map } from "rxjs/operators";

@Component({
    selector: 'jerrychild',
    templateUrl: './child.html'
  })
export class ChildComponent{
  @Input()
  childString: string = 'this is Child';
}
