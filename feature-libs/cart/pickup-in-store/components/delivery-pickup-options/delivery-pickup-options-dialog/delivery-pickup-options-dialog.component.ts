import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnDestroy,
  OnInit,
  ElementRef,
} from '@angular/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import {
  ActiveCartService,
  AuthService,
  Cart,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrderEntry } from '@spartacus/core';
@Component({
  selector: 'cx-delivery-pickup-options-dialog.component',
  templateUrl: './delivery-pickup-options-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryPickupOptionsDialogComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  protected loggedIn = false;
  orderEntry: OrderEntry;

  iconTypes = ICON_TYPE;
  @ViewChild('element') element: ElementRef;
  cart$: Observable<Cart>;

  constructor(
    protected activeCartService: ActiveCartService,
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected launchDialogService: LaunchDialogService,

    protected el: ElementRef
  ) {}

  ngOnInit(): void {
    this.cart$ = combineLatest([
      this.activeCartService.getActive(),
      this.authService.isUserLoggedIn(),
    ]).pipe(
      tap(([_, loggedIn]) => (this.loggedIn = loggedIn)),
      map(([activeCart]) => activeCart)
    );

    this.launchDialogService.data$.subscribe((data) => {
      this.orderEntry = data;
    });
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
