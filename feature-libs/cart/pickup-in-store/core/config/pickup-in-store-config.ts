import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class PickupInStoreConfig {
  pickupInStore?: {
    file: { separator: string };
    export?: {};
  };
}

declare module '@spartacus/core' {
  interface Config extends PickupInStoreConfig {}
}
