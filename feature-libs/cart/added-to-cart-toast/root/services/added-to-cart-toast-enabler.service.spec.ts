import { TestBed } from '@angular/core/testing';
import { LaunchDialogService } from 'projects/storefrontlib/layout';
import { AddedToCartToastConfig } from '../../added-to-cart-toast-config';
import { AddedToCartToastEnablerService } from './added-to-cart-toast-enabler.service';

class MockLaunchDialogService {
  launch() {}
}
const mockAddedToCartToastConfig: AddedToCartToastConfig = {
  addedToCartToast: {
    enabled: true,
    timeout: 5000,
  },
};

describe('AddedToCartToastEnablerService', () => {
  let addedToCartEnablerService: AddedToCartToastEnablerService;
  let addedToCartToastConfig: AddedToCartToastConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: AddedToCartToastConfig,
          useValue: mockAddedToCartToastConfig,
        },
      ],
    });
    addedToCartEnablerService = TestBed.inject(AddedToCartToastEnablerService);
    addedToCartToastConfig = TestBed.inject(AddedToCartToastConfig);
  });

  it('should be created', () => {
    expect(addedToCartEnablerService).toBeTruthy();
  });

  it('should add UI when config is enabled', () => {
    spyOn(<any>addedToCartEnablerService, 'addUi').and.stub();
    addedToCartEnablerService.load();
    expect(addedToCartEnablerService.addUi).toHaveBeenCalled();
  });

  it('should not add UI when config is disabled', () => {
    if (addedToCartToastConfig.addedToCartToast) {
      addedToCartToastConfig.addedToCartToast.enabled = false;
    }
    spyOn(<any>addedToCartEnablerService, 'addUi').and.stub();
    addedToCartEnablerService.load();
    expect(addedToCartEnablerService.addUi).not.toHaveBeenCalled();
  });
});
