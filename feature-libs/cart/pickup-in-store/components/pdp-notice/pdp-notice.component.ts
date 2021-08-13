import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '@spartacus/storefront';
import { ICON_TYPE } from '@spartacus/storefront';
@Component({
  selector: 'cx-pdp-notice',
  templateUrl: './pdp-notice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdpNoticeComponent implements OnInit, OnDestroy {
  @Input() availableForPickup = false;
  product$: Observable<Product> = this.currentProductService.getProduct();

  iconTypes = ICON_TYPE;

  constructor(protected currentProductService: CurrentProductService) {}

  ngOnInit() {}

  ngOnDestroy() {}
}
