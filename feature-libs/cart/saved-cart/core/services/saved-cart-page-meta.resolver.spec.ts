import { TestBed } from '@angular/core/testing';
import {
  BasePageMetaResolver,
  BreadcrumbMeta,
  I18nTestingModule,
  RouterState,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { SavedCartPageMetaResolver } from './saved-cart-page-meta.resolver';

const testHomeBreadcrumb: BreadcrumbMeta = { label: 'Test Home', link: '/' };

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of({ state: {} } as RouterState);
  }
}

class MockBasePageMetaResolver {
  resolveTitle() {
    return of('testContentPageTitle');
  }
  resolveBreadcrumbs() {
    return of([testHomeBreadcrumb]);
  }
}

const savedCartUrl = '/my-account/saved-carts';
const savedCartTranslationKey = 'breadcrumb';
const savedCartBreadcrumb: BreadcrumbMeta = {
  label: savedCartTranslationKey,
  link: savedCartUrl,
};
class MockSemanticPathService implements Partial<SemanticPathService> {
  get = jasmine.createSpy('get').and.returnValue(savedCartUrl);
}

describe('SavedCartPageMetaResolver', () => {
  let resolver: SavedCartPageMetaResolver;
  let routingService: RoutingService;
  let basePageMetaResolver: BasePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },

        {
          provide: BasePageMetaResolver,
          useClass: MockBasePageMetaResolver,
        },
      ],
    });

    resolver = TestBed.inject(SavedCartPageMetaResolver);
    routingService = TestBed.inject(RoutingService);
    basePageMetaResolver = TestBed.inject(BasePageMetaResolver);
  });

  describe('resolveTitle', () => {
    it('should emit title of CMS content page ', async () => {
      expect(await resolver.resolveTitle().pipe(take(1)).toPromise()).toBe(
        'testContentPageTitle'
      );
    });
  });

  describe('resolveBreadcrumbs', () => {
    describe('when being on the Saved Cart page', () => {
      beforeEach(() => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of({ state: { semanticRoute: 'savedCarts' } } as any)
        );
      });

      it('should NOT return breadcrumb for the Saved Cart page', async () => {
        expect(
          await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
        ).toEqual([testHomeBreadcrumb]);
      });
    });

    describe('when being on Saved Cart Details page', () => {
      const testDetailsBreadcrumb: BreadcrumbMeta = {
        link: '/my-account/saved-carts',
        label: 'breadcrumb',
      };

      beforeEach(() => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of({ state: { semanticRoute: 'savedCartsDetails' } } as any)
        );

        spyOn(basePageMetaResolver, 'resolveBreadcrumbs').and.returnValue(
          of([testHomeBreadcrumb, testDetailsBreadcrumb])
        );
      });

      it('should insert breadcrumb for the Saved Cart page right after the Homepage breadcrumb', async () => {
        expect(
          await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
        ).toEqual([
          testHomeBreadcrumb,
          savedCartBreadcrumb,
          testDetailsBreadcrumb,
        ]);
      });
    });
  });
});
