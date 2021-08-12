import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
@Component({
  selector: 'cx-pdp-notice',
  templateUrl: './pdp-notice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdpNoticeComponent {
  constructor() {}

  iconTypes = ICON_TYPE;
}
