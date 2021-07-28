import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuickOrderStatePersistenceService } from '@spartacus/cart/quick-order/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  ActiveCartService,
  CmsQuickOrderComponent,
  GlobalMessageService,
  GlobalMessageType,
  OrderEntry,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-quick-order',
  templateUrl: './quick-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderComponent implements OnInit {
  cartId$: Observable<string>;
  entries$: Observable<OrderEntry[]>;
  isLoading$: Observable<boolean> = this.activeCartService.isStable();
  quickOrderListLimit$: Observable<
    number | undefined
  > = this.component.data$.pipe(map((data) => data.quickOrderListLimit));

  constructor(
    protected activeCartService: ActiveCartService,
    protected component: CmsComponentData<CmsQuickOrderComponent>,
    protected globalMessageService: GlobalMessageService,
    protected quickOrderService: QuickOrderFacade,
    protected quickOrderStatePersistenceService: QuickOrderStatePersistenceService
  ) {}

  ngOnInit(): void {
    this.cartId$ = this.activeCartService.getActiveCartId();
    this.entries$ = this.quickOrderService.getEntries();
    this.quickOrderStatePersistenceService.initSync();
  }

  clear(): void {
    this.quickOrderService.clearList();
    this.globalMessageService.add(
      {
        key: 'quickOrderTable.listCleared',
      },
      GlobalMessageType.MSG_TYPE_INFO
    );
  }

  addToCart(): void {
    this.entries$
      .pipe(
        first(),
        switchMap((entries) => {
          this.activeCartService.addEntries(entries);

          return this.isLoading$;
        }),
        filter(Boolean)
      )
      .subscribe(() => {
        this.quickOrderService.clearList();
        this.globalMessageService.add(
          {
            key: 'quickOrderTable.addedtoCart',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });
  }
}
