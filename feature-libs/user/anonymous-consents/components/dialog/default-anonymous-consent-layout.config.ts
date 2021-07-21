import { LayoutConfig, OutletPosition } from '@spartacus/storefront';
import { AnonymousConsentManagementBannerComponent } from '../banner/anonymous-consent-management-banner.component';

export const defaultAnonymousConsentLayoutConfig: LayoutConfig = {
  launch: {
    ANONYMOUS_CONSENT: {
      outlet: 'cx-footer',
      component: AnonymousConsentManagementBannerComponent,
      position: OutletPosition.AFTER,
    },
  },
};
