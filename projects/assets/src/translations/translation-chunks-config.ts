export interface TranslationChunksConfig {
  [chunk: string]: string[];
}

export const translationChunksConfig: TranslationChunksConfig = {
  common: [
    'common',
    'spinner',
    'searchBox',
    'navigation',
    'sorting',
    'httpHandlers',
    'pageMetaResolver',
    'miniCart',
    'miniLogin',
    'skipLink',
    'formErrors',
    'errorHandlers',
  ],
  cart: [
    'cartDetails',
    'cartItems',
    'orderCost',
    'voucher',
    'wishList',
    'saveForLaterItems',
  ],
  address: ['addressForm', 'addressBook', 'addressCard'],
  payment: ['paymentForm', 'paymentMethods', 'paymentCard', 'paymentTypes'],
  myAccount: [
    'orderDetails',
    'orderHistory',
    'closeAccount',
    'updateEmailForm',
    'updatePasswordForm',
    'updateProfileForm',
    'consentManagementForm',
    'myCoupons',
    'wishlist',
    'notificationPreference',
    'myInterests',
    'AccountOrderHistoryTabContainer',
    'returnRequestList',
    'returnRequest',
  ],
  storeFinder: ['storeFinder'],
  pwa: ['pwa'],
  checkout: [
    'checkout',
    'checkoutAddress',
    'checkoutOrderConfirmation',
    'checkoutReview',
    'checkoutShipping',
    'checkoutProgress',
    'checkoutPO',
  ],
  product: [
    'productDetails',
    'productList',
    'productFacetNavigation',
    'productSummary',
    'productReview',
    'addToCart',
    'addToWishList',
    'CMSTabParagraphContainer',
    'variant',
    'stockNotification',
    'TabPanelContainer',
  ],
  user: [
    'anonymousConsents',
    'forgottenPassword',
    'loginForm',
    'loginRegister',
    'register',
    'checkoutLogin',
  ],

  organization: [
    'breadcrumbs',
    'budgetsList',
    'budget',
    'budgetForm',
    'permissionsList',
    'permissionForm',
    'permission',
    'orgUnitsList',
    'orgUnitTree',
    'orgUnit',
    'orgUnitForm',
    'unitUsers',
    'unitAssignRoles',
    'unitApprovers',
    'unitAssignApprovers',
    'unitManageAddresses',
    'unitAddressDetails',
    'unitAddressCreate',
    'unitAddressEdit',
    'unitAddressForm',
    'unitCostCenters',
    'unitChildren',
    'userGroupsList',
    'userGroup',
    'userGroupForm',
    'userGroupPermissions',
    'userGroupAssignPermissions',
    'userGroupUsers',
    'userGroupAssignUsers',
    'usersList',
    'user',
    'userForm',
    'userPermissions',
    'userAssignPermissions',
    'userUserGroups',
    'userAssignUserGroups',
    'userApprovers',
    'userAssignApprovers',
    'orderApproval',
    'orderApprovalList',
  ],
};
