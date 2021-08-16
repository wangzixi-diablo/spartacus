import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentProductService } from '@spartacus/storefront';
import { ICON_TYPE } from '@spartacus/storefront';
@Component({
  selector: 'cx-delivery-pickup-options',
  templateUrl: './delivery-pickup-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryPickupOptionsComponent implements OnInit, OnDestroy {
  @Input() availableForPickup = false;
  subscription: Subscription;

  iconTypes = ICON_TYPE;

  constructor(protected currentProductService: CurrentProductService) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
