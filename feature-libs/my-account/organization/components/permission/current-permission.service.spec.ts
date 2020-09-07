import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { CurrentPermissionService } from '.';
import { PermissionService } from '@spartacus/my-account/organization/core';

class MockRoutingService {
  getParams() {
    return of();
  }

  getRouterState() {
    return of();
  }
}

class MockPermissionService implements Partial<PermissionService> {
  get() {
    return of();
  }
}

describe('CurrentPermissionService', () => {
  let service: CurrentPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentPermissionService,

        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PermissionService, useClass: MockPermissionService },
      ],
    });

    service = TestBed.inject(CurrentPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
