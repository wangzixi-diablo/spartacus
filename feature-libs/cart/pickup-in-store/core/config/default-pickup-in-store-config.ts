import { PickupInStoreConfig } from './pickup-in-store-config';

// TODO: Avoid using duplicated config #11931
export const defaultPickupInStoreConfig: PickupInStoreConfig = {
  pickupInStore: {
    file: {
      separator: ',',
    },
    export: {
      additionalColumns: [
        {
          name: {
            key: 'name',
          },
          value: 'product.name',
        },
        {
          name: {
            key: 'price',
          },
          value: 'totalPrice.formattedValue',
        },
      ],
    },
  },
};
