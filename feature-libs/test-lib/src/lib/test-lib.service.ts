import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestLibService {

  constructor() { }

  public hello(){
    console.log('hello');
  }
}
