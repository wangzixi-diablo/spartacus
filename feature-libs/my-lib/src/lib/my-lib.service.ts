import { Injectable } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root'
})
export class MyLibService {

  constructor() { }

  public hello(){
    console.log('Hello Jerry!,', ICON_TYPE);
  }
}
