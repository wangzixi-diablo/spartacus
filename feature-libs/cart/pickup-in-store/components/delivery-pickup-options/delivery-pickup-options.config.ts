import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { DeliveryPickupOptionsDialogComponent } from './delivery-pickup-options-dialog/delivery-pickup-options-dialog.component';

export const defaultDeliveryPickupOptionsLayoutConfig: LayoutConfig = {
  launch: {
    PICKUP_IN_STORE: {
      inline: true,
      component: DeliveryPickupOptionsDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
