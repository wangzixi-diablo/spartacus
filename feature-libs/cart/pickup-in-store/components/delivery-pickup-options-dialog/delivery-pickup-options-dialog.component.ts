import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';

@Component({
  selector: 'cx-delivery-pickup-options-dialog.component',
  templateUrl: './delivery-pickup-options-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesDialogComponent {
  iconTypes = ICON_TYPE;

  formState: Boolean = true;

  constructor(protected launchDialogService: LaunchDialogService) {}

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
