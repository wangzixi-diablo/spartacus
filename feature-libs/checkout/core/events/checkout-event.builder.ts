import { Injectable } from '@angular/core';
import { StateEventService } from '@spartacus/core';
import { CheckoutActions } from '../store/actions/index';
import { OrderPlacedEvent, DeliveryModeEvent } from '@spartacus/checkout/root';

@Injectable()
export class CheckoutEventBuilder {
  constructor(protected stateEventService: StateEventService) {
    this.register();
  }

  /**
   * Registers checkout events
   */
  protected register(): void {
    this.orderPlacedEvent();
    this.deliveryModeEvent();
  }

  /**
   * Register an order successfully placed event
   */
  protected orderPlacedEvent(): void {
    this.stateEventService.register({
      action: CheckoutActions.PLACE_ORDER_SUCCESS,
      event: OrderPlacedEvent,
    });
  }

  /**
   * Register an order successfully placed event
   */
  protected deliveryModeEvent(): void {
    this.stateEventService.register({
      action: CheckoutActions.SET_DELIVERY_MODE_SUCCESS,
      event: DeliveryModeEvent,
    });
  }

}
