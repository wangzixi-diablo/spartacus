import { Component, Input, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
// import { filter, map } from "rxjs/operators";

@Component({
    selector: 'jerryapp',
    templateUrl: './jerry.html'
  })
export class JerryComponent{
  public foo = "";
  private _filter$ = new EventEmitter<string>();

  @Input()
  set filter(filter: string) {
    console.log('Jerry filter is set: ', filter);
  }

  public getFilteredProducts$(
    unfilteredProductReferences$: Observable<string>
  ): Observable<string> {
      console.log(this._filter$);
      return unfilteredProductReferences$;
  }
}
