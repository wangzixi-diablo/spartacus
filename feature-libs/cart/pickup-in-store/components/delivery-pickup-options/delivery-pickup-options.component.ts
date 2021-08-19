import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  CurrentProductService,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { ICON_TYPE } from '@spartacus/storefront';
@Component({
  selector: 'cx-delivery-pickup-options',
  templateUrl: './delivery-pickup-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryPickupOptionsComponent implements OnInit, OnDestroy {
  @Input() availableForPickup = false;
  subscription: Subscription;
  data = '';
  @ViewChild('open') element: ElementRef;

  iconTypes = ICON_TYPE;

  constructor(
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService,
    protected currentProductService: CurrentProductService
  ) {}

  ngOnInit() {}

  openDialog(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.PICKUP_IN_STORE,
      this.element,
      this.vcr,
      this.data
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
