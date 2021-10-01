import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductSearchService } from '@spartacus/core';
import { OnNavigateConfig, OnNavigateService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomNavigationService extends OnNavigateService {
  constructor(
    protected config: OnNavigateConfig,
    protected router: Router,
    protected viewportScroller: ViewportScroller,
    protected productSearchService: ProductSearchService
  ) // protected applicationRef: ApplicationRef // protected injector: Injector
  {
    super(config, router, viewportScroller);
  }

  isDataLoaded(): Observable<boolean> {
    return this.productSearchService.getResults().pipe(
      map((test) => {
        console.log('what', test);
        return !!test;
      })
    );
  }
}
