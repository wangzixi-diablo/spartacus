import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';

@Component({
  selector: 'cx-delivery-pickup-options-dialog.component',
  templateUrl: './delivery-pickup-options-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryPickupOptionsDialogComponent {
  iconTypes = ICON_TYPE;

  constructor(protected launchDialogService: LaunchDialogService) {}

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
