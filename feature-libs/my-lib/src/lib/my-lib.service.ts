import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyLibService {

  constructor() { }

  public hello(){
    console.log('Hello Jerry!');
  }
}
