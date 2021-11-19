import { Component, Input, EventEmitter } from "@angular/core";
import { defer, fromEvent, interval } from 'rxjs';

import { Observable, Subject } from "rxjs";
// import { filter, map } from "rxjs/operators";

@Component({
    selector: 'jerryapp',
    templateUrl: './jerry.html'
  })
export class JerryComponent{
  public foo = "I am Parent";
  private _filter$ = new EventEmitter<string>();

  private clicked: boolean = false;
  switch$ = new Subject<boolean>();

  constructor(){
    const clicksOrInterval = defer(function () {
      return Math.random() > 0.5
        ? fromEvent(document, 'click')
        : interval(1000);
    });
    clicksOrInterval.subscribe(x => console.log(x));
  }
  toggle(){
    if(this.clicked){
      this.switch$.next(false);
    }
    else{
      this.switch$.next(true);
    }
    this.clicked = !this.clicked;
  }

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
