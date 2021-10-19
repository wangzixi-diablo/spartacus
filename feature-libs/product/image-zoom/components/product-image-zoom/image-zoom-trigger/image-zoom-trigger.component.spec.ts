import {
  Component,
  ComponentRef,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of } from 'rxjs';
import { ImageZoomTriggerComponent } from './image-zoom-trigger.component';

@Component({
  template: '',
})
class TestDialogComponent {
  @Input() galleryItem: number;
  constructor(public vcr: ViewContainerRef) {}
}

class MockLaunchDialogService {
  launch() {}
  clear() {}
  get dialogClose() {
    return of('close');
  }
}

describe('ImageZoomTriggerComponent', () => {
  let component: ImageZoomTriggerComponent;
  let fixture: ComponentFixture<ImageZoomTriggerComponent>;
  let testDialogComponent: ComponentRef<TestDialogComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
      declarations: [ImageZoomTriggerComponent, TestDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageZoomTriggerComponent);
    component = fixture.componentInstance;
    testDialogComponent =
      TestBed.createComponent(TestDialogComponent).componentRef;
    launchDialogService = TestBed.inject(LaunchDialogService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('expandImage', () => {
    beforeEach(() => {
      spyOn(launchDialogService, 'launch').and.returnValue(
        of(testDialogComponent)
      );
    });

    it('should call launchDialogService launch', () => {
      component.triggerZoom();

      expect(launchDialogService.launch).toHaveBeenCalledWith(
        LAUNCH_CALLER.IMAGE_ZOOM,
        component['vcr']
      );
    });

    it('should call LaunchDialogService clear on close', () => {
      spyOn(launchDialogService, 'clear');

      component.triggerZoom();

      expect(launchDialogService.clear).toHaveBeenCalledWith(
        LAUNCH_CALLER.IMAGE_ZOOM
      );
    });

    it('should destroy component on close', () => {
      spyOn(testDialogComponent, 'destroy');

      component.triggerZoom();

      expect(testDialogComponent.destroy).toHaveBeenCalled();
    });
  });

  describe('on expandImage set ', () => {
    it('with true value should call triggerZoom method', () => {
      spyOn(component, 'triggerZoom');

      fixture.componentInstance.expandImage = true;

      expect(component.triggerZoom).toHaveBeenCalled();
    });

    it('with false value should not call triggerZoom method', () => {
      spyOn(component, 'triggerZoom');

      fixture.componentInstance.expandImage = false;

      expect(component.triggerZoom).not.toHaveBeenCalled();
    });
  });
});
