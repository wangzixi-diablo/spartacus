import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { CurrentProductService } from '@spartacus/storefront';
import { ICON_TYPE } from '@spartacus/storefront';
@Component({
  selector: 'cx-pdp-notice',
  templateUrl: './pdp-notice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdpNoticeComponent implements OnInit, OnDestroy {
  @Input() availableForPickup = false;
  subscription: Subscription;
  product$: Observable<Product> = this.currentProductService.getProduct();

  iconTypes = ICON_TYPE;

  constructor(protected currentProductService: CurrentProductService) {}

  ngOnInit() {
    if (this.product$) {
      this.subscription = this.product$.subscribe((product) => {
        this.availableForPickup = product.availableForPickup;
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
