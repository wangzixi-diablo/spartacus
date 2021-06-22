import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
  ASM_FEATURE,
  ASM_STATE,
  B2B_STOREFRONT_MODULE,
  B2C_STOREFRONT_MODULE,
  CART_ITEM_COMPONENT,
  CART_PAGE_META_RESOLVER,
  CLOSE_ACCOUNT_COMPONENT,
  CLOSE_ACCOUNT_MODAL_COMPONENT,
  CLOSE_ACCOUNT_MODULE,
  CMS_FEATURES_SERVICE,
  CMS_LIB_MODULE,
  CONTENT_PAGE_META_RESOLVER,
  CUSTOMER_ACTION,
  CUSTOMER_SEARCH,
  CUSTOMER_SEARCH_CLASS,
  CUSTOMER_SEARCH_DATA,
  CUSTOMER_SEARCH_FAIL,
  CUSTOMER_SEARCH_FAIL_CLASS,
  CUSTOMER_SEARCH_RESET,
  CUSTOMER_SEARCH_RESET_CLASS,
  CUSTOMER_SEARCH_SUCCESS,
  CUSTOMER_SEARCH_SUCCESS_CLASS,
  DEFAULT_LOCAL_STORAGE_KEY,
  DEFAULT_SESSION_STORAGE_KEY,
  DEFAULT_STATE_CONFIG,
  EVENTS_MODULE,
  FEATURE_MODULES_SERVICE,
  FORGOTTEN_PASSWORD_TRANSLATION_CHUNK,
  FORGOT_PASSWORD_COMPONENT,
  FORGOT_PASSWORD_MODULE,
  GET_ASM_STATE,
  GET_ASM_UI,
  GET_CUSTOMER_SEARCH_RESULTS,
  GET_CUSTOMER_SEARCH_RESULTS_LOADER_STATE,
  GET_CUSTOMER_SEARCH_RESULTS_LOADING,
  ITEM,
  LOGIN_COMPONENT,
  LOGIN_FORM_COMPONENT,
  LOGIN_FORM_MODULE,
  LOGIN_FORM_TRANSLATION_CHUNK,
  LOGIN_MODULE,
  LOGIN_REGISTER_COMPONENT,
  LOGIN_REGISTER_MODULE,
  LOGOUT_CUSTOMER_SUPPORT_AGENT,
  LOGOUT_CUSTOMER_SUPPORT_AGENT_CLASS,
  MAIN_MODULE,
  MINI_LOGIN_TRANSLATION_CHUNK,
  OCC_MODULE,
  ORDER_ENTRY,
  PERSONALIZATION_ACTION,
  PERSONALIZATION_CONFIG,
  PERSONALIZATION_CONTEXT,
  PERSONALIZATION_CONTEXT_SERVICE,
  PERSONALIZATION_MODULE,
  PRODUCT_VARIANTS_MODULE,
  PRODUCT_VARIANT_COMPONENT,
  PRODUCT_VARIANT_GUARD,
  PRODUCT_VARIANT_STYLE_ICONS_COMPONENT,
  PRODUCT_VARIANT_STYLE_ICONS_MODULE,
  QUALTRICS_LOADER_SERVICE,
  REGISTER_COMPONENT,
  REGISTER_COMPONENT_MODULE,
  REGISTER_TRANSLATION_CHUNK,
  REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
  RESET_PASSWORD_COMPONENT,
  RESET_PASSWORD_FORM_COMPONENT,
  RESET_PASSWORD_MODULE,
  ROUTE_BACK_ACTION,
  ROUTE_FORWARD_ACTION,
  ROUTE_GO_ACTION,
  ROUTE_GO_BY_URL_ACTION,
  ROUTING_ACTIONS,
  ROUTING_SERVICE,
  SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
  SMART_EDIT_MODULE,
  SMART_EDIT_SERVICE,
  SPARTACUS_CART_SAVED_CART_COMPONENTS,
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
  SPARTACUS_SETUP,
  SPARTACUS_STOREFINDER,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_USER,
  SPARTACUS_USER_ACCOUNT_COMPONENTS,
  SPARTACUS_USER_PROFILE_COMPONENTS,
  STATE_WITH_ASM,
  STOREFRONT_FOUNDATION_MODULE,
  STOREFRONT_MODULE,
  STORE_DATA_SERVICE,
  TRANSLATION_CHUNKS_CONFIG,
  UPDATE_EMAIL_COMPONENT,
  UPDATE_EMAIL_FORM_COMPONENT,
  UPDATE_EMAIL_FORM_TRANSLATION_CHUNK,
  UPDATE_EMAIL_MODULE,
  UPDATE_PASSWORD_COMPONENT,
  UPDATE_PASSWORD_FORM_COMPONENT,
  UPDATE_PASSWORD_MODULE,
  UPDATE_PROFILE_COMPONENT,
  UPDATE_PROFILE_MODULE,
  USER_COMPONENT_MODULE,
  VARIANT_COLOR_SELECTOR_COMPONENT,
  VARIANT_COLOR_SELECTOR_MODULE,
  VARIANT_SIZE_SELECTOR_COMPONENT,
  VARIANT_SIZE_SELECTOR_MODULE,
  VARIANT_STYLE_ICONS_COMPONENT,
  VARIANT_STYLE_ICONS_MODULE,
  VARIANT_STYLE_SELECTOR_COMPONENT,
  VARIANT_STYLE_SELECTOR_MODULE,
  VIEW_CONFIG_MODULE,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics-loader.service.ts
  {
    node: QUALTRICS_LOADER_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${QUALTRICS_LOADER_SERVICE}' was moved to @spartacus/qualtrics/components.`,
  },
  {
    node: B2C_STOREFRONT_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${B2C_STOREFRONT_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: B2B_STOREFRONT_MODULE,
    importPath: SPARTACUS_SETUP,
    comment: `${B2B_STOREFRONT_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: STOREFRONT_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${STOREFRONT_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: CMS_LIB_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${CMS_LIB_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: MAIN_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${MAIN_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: STOREFRONT_FOUNDATION_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${STOREFRONT_FOUNDATION_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: VIEW_CONFIG_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${VIEW_CONFIG_MODULE} was removed as it was only providing empty config, which is not needed.`,
  },
  {
    node: OCC_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `${OCC_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  {
    node: EVENTS_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `${EVENTS_MODULE} was removed. Check "Migrating to new, reference app structure" section in the migration docs on how to replace it.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_CLASS,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_CLASS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_FAIL,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_FAIL}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_FAIL_CLASS,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_FAIL_CLASS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_SUCCESS,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_SUCCESS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_SUCCESS_CLASS,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_SUCCESS_CLASS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_RESET,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_RESET}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_SEARCH_RESET_CLASS,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_RESET_CLASS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/customer.action.ts
  {
    node: CUSTOMER_ACTION,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_ACTION}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/logout-agent.action.ts
  {
    node: LOGOUT_CUSTOMER_SUPPORT_AGENT,
    importPath: SPARTACUS_CORE,
    comment: `'${LOGOUT_CUSTOMER_SUPPORT_AGENT}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/actions/logout-agent.action.ts
  {
    node: LOGOUT_CUSTOMER_SUPPORT_AGENT_CLASS,
    importPath: SPARTACUS_CORE,
    comment: `'${LOGOUT_CUSTOMER_SUPPORT_AGENT_CLASS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    node: ASM_FEATURE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_FEATURE}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    node: CUSTOMER_SEARCH_DATA,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SEARCH_DATA}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    node: STATE_WITH_ASM,
    importPath: SPARTACUS_CORE,
    comment: `'${STATE_WITH_ASM}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    node: ASM_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_STATE}' was moved to @spartacus/asm/core.`,
  },

  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    node: GET_ASM_UI,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_ASM_UI}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    node: GET_CUSTOMER_SEARCH_RESULTS_LOADER_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_CUSTOMER_SEARCH_RESULTS_LOADER_STATE}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    node: GET_CUSTOMER_SEARCH_RESULTS,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_CUSTOMER_SEARCH_RESULTS}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    node: GET_CUSTOMER_SEARCH_RESULTS_LOADING,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_CUSTOMER_SEARCH_RESULTS_LOADING}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/selectors/asm-ui.selectors.ts
  {
    node: GET_CUSTOMER_SEARCH_RESULTS_LOADING,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_CUSTOMER_SEARCH_RESULTS_LOADING}' was moved to @spartacus/asm/core.`,
  },
  // projects/core/src/asm/store/selectors/feature.selector.ts
  {
    node: GET_ASM_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${GET_ASM_STATE}' was moved to @spartacus/asm/core.`,
  },
  {
    node: SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
    importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
    comment: `'${SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE}' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.`,
  },
  {
    node: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE}' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.`,
  },
  {
    node: REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE}' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.`,
  },
  // projects/core/src/smart-edit/smart-edit.module.ts
  {
    node: SMART_EDIT_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${SMART_EDIT_MODULE}' was removed. Use @spartacus/smartedit instead.`,
  },
  // projects/core/src/smart-edit/services/smart-edit.service.ts
  {
    node: SMART_EDIT_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${SMART_EDIT_SERVICE}' was moved to @spartacus/smartedit/core.`,
  },
  // projects/core/src/personalization/personalization.module.ts
  {
    node: PERSONALIZATION_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${PERSONALIZATION_MODULE}' was removed. Use @spartacus/tracking/personalization instead.`,
  },
  // projects/core/src/personalization/config/personalization-config.ts
  {
    node: PERSONALIZATION_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `'${PERSONALIZATION_CONFIG}' was moved to @spartacus/tracking/personalization/root.`,
  },
  // projects/core/src/personalization/services/personalization-context.service.ts
  {
    node: PERSONALIZATION_CONTEXT_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${PERSONALIZATION_CONTEXT_SERVICE}' was moved to @spartacus/tracking/personalization/core.`,
  },
  // projects/core/src/personalization/model/personalization-context.model.ts
  {
    node: PERSONALIZATION_ACTION,
    importPath: SPARTACUS_CORE,
    comment: `'${PERSONALIZATION_ACTION}' was moved to @spartacus/tracking/personalization/core.`,
  },
  // projects/core/src/personalization/model/personalization-context.model.ts
  {
    node: PERSONALIZATION_CONTEXT,
    importPath: SPARTACUS_CORE,
    comment: `'${PERSONALIZATION_CONTEXT}' was moved to @spartacus/tracking/personalization/core.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/product-variants.module.ts
  {
    node: PRODUCT_VARIANTS_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PRODUCT_VARIANTS_MODULE}' was removed from @spartacus/storefront. Use @spartacus/product/variants feature-library instead.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/product-variants.component.ts
  {
    node: PRODUCT_VARIANT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PRODUCT_VARIANT_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantsContainerComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-color-selector/variant-color-selector.component.ts
  {
    node: VARIANT_COLOR_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_COLOR_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantColorSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-color-selector/variant-color-selector.module.ts
  {
    node: VARIANT_COLOR_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_COLOR_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantColorSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-size-selector/variant-size-selector.component.ts
  {
    node: VARIANT_SIZE_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_SIZE_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantSizeSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-size-selector/variant-size-selector.module.ts
  {
    node: VARIANT_SIZE_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_SIZE_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantSizeSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-selector/variant-style-selector.component.ts
  {
    node: VARIANT_STYLE_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantStyleSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-selector/variant-style-selector.module.ts
  {
    node: VARIANT_STYLE_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantStyleSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-icons/variant-style-icons.component.ts
  {
    node: VARIANT_STYLE_ICONS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_ICONS_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantStyleIconsComponent from @spartacus/product/variants/root as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-icons/variant-style-icons.module.ts
  {
    node: VARIANT_STYLE_ICONS_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_ICONS_MODULE}' was removed from @spartacus/storefront. Use ProductVariantStyleIconsModule from @spartacus/product/variants/root as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/guards/product-variant.guard.ts
  {
    node: PRODUCT_VARIANT_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PRODUCT_VARIANT_GUARD}' was removed from @spartacus/storefront. Use ProductVariantsGuard from @spartacus/product/variants/components instead. Additionally method: findVariant was renamed to findPurchasableProductCode.`,
  },
  {
    node: PRODUCT_VARIANT_STYLE_ICONS_MODULE,
    importPath: SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
    comment: `'${PRODUCT_VARIANT_STYLE_ICONS_MODULE}' was removed from ${SPARTACUS_PRODUCT_VARIANTS_COMPONENTS}. Use @spartacus/product/variants/root instead.`,
  },
  {
    node: PRODUCT_VARIANT_STYLE_ICONS_COMPONENT,
    importPath: SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
    comment: `'${PRODUCT_VARIANT_STYLE_ICONS_COMPONENT}' was removed from ${SPARTACUS_PRODUCT_VARIANTS_COMPONENTS}. Use @spartacus/product/variants/root instead.`,
  },
  {
    node: DEFAULT_STATE_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `'${DEFAULT_STATE_CONFIG}' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.`,
  },
  {
    node: DEFAULT_LOCAL_STORAGE_KEY,
    importPath: SPARTACUS_CORE,
    comment: `'${DEFAULT_LOCAL_STORAGE_KEY}' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.`,
  },
  {
    node: DEFAULT_SESSION_STORAGE_KEY,
    importPath: SPARTACUS_CORE,
    comment: `'${DEFAULT_SESSION_STORAGE_KEY}' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.`,
  },
  {
    node: CART_PAGE_META_RESOLVER,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_PAGE_META_RESOLVER}' was removed since all data is now data driven by CMS page data and is resolved by the ${CONTENT_PAGE_META_RESOLVER}`,
  },
  // projects/storefrontlib/src/cms-components/cart/cart-shared/cart-item/cart-item.component.ts
  {
    node: CART_ITEM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${ITEM}' interface was removed from ${CART_ITEM_COMPONENT}. User ${ORDER_ENTRY} instad.`,
  },
  {
    node: FEATURE_MODULES_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${FEATURE_MODULES_SERVICE}' was removed. Use '${CMS_FEATURES_SERVICE}' instead.`,
  },
  // projects/assets/src/translations/translation-chunks-config.ts
  {
    node: TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `Following translation chunks '${MINI_LOGIN_TRANSLATION_CHUNK}', '${UPDATE_EMAIL_FORM_TRANSLATION_CHUNK}', '${FORGOTTEN_PASSWORD_TRANSLATION_CHUNK}', '${LOGIN_FORM_TRANSLATION_CHUNK}', '${REGISTER_TRANSLATION_CHUNK}' were moved to ${SPARTACUS_USER}.`,
  },
  // projects/storefrontlib/src/cms-components/cms-lib.module.ts
  {
    node: CMS_LIB_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `Following module imports '${CLOSE_ACCOUNT_MODULE}', '${FORGOT_PASSWORD_MODULE}', '${RESET_PASSWORD_MODULE}', '${UPDATE_EMAIL_MODULE}', '${UPDATE_PASSWORD_MODULE}', '${UPDATE_PROFILE_MODULE}', '${USER_COMPONENT_MODULE}' were removed. Those modules are now part of ${SPARTACUS_USER}.`,
  },
  // projects/storefrontlib/src/cms-components/user/user.module.ts
  {
    node: USER_COMPONENT_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `Following module imports '${LOGIN_MODULE}', '${LOGIN_FORM_MODULE}', '${LOGIN_REGISTER_MODULE}', '${REGISTER_COMPONENT_MODULE}' were removed. Those modules are now part of ${SPARTACUS_USER}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/close-account/close-account.module.ts
  {
    node: CLOSE_ACCOUNT_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${CLOSE_ACCOUNT_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/close-account/components/close-account/close-account.component.ts
  {
    node: CLOSE_ACCOUNT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${CLOSE_ACCOUNT_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/close-account/components/close-account-modal/close-account-modal.component.ts
  {
    node: CLOSE_ACCOUNT_MODAL_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${CLOSE_ACCOUNT_MODAL_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}. Also there were small changes in component's logic. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/forgot-password/forgot-password.module.ts
  {
    node: FORGOT_PASSWORD_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${FORGOT_PASSWORD_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/forgot-password/forgot-password.component.ts
  {
    node: FORGOT_PASSWORD_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${FORGOT_PASSWORD_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}. Logic for this component was changed and introduced in new 'ForgotPasswordService'. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/src/cms-components/user/login/login.module.ts
  {
    node: LOGIN_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${LOGIN_MODULE}' was moved to ${SPARTACUS_USER_ACCOUNT_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/user/login/login.component.ts
  {
    node: LOGIN_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${LOGIN_COMPONENT}' was moved to '${SPARTACUS_USER_ACCOUNT_COMPONENTS}'. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/src/cms-components/user/login-register/login-register.module.ts
  {
    node: LOGIN_REGISTER_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${LOGIN_REGISTER_MODULE}' was moved to ${SPARTACUS_USER_ACCOUNT_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/user/login-register/login-register.component.ts
  {
    node: LOGIN_REGISTER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${LOGIN_REGISTER_COMPONENT}' was moved to '${SPARTACUS_USER_ACCOUNT_COMPONENTS}'.`,
  },
  // projects/storefrontlib/src/cms-components/user/login-form/login-form.module.ts
  {
    node: LOGIN_FORM_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${LOGIN_FORM_MODULE}' was moved to ${SPARTACUS_USER_ACCOUNT_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/user/login-form/login-form.component.ts
  {
    node: LOGIN_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${LOGIN_FORM_COMPONENT}' was moved to '${SPARTACUS_USER_ACCOUNT_COMPONENTS}'. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/src/cms-components/user/register/register.module.ts
  {
    node: REGISTER_COMPONENT_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${REGISTER_COMPONENT_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/user/register/register.component.ts
  {
    node: REGISTER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${REGISTER_COMPONENT}' was moved to '${SPARTACUS_USER_PROFILE_COMPONENTS}'. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/reset-password/reset-password.module.ts
  {
    node: RESET_PASSWORD_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${RESET_PASSWORD_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/reset-password/reset-password-form.component.ts
  {
    node: RESET_PASSWORD_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${RESET_PASSWORD_FORM_COMPONENT}' was renamed to '${RESET_PASSWORD_COMPONENT}' and now it can be used from ${SPARTACUS_USER_PROFILE_COMPONENTS}. Also logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-email/update-email.module.ts
  {
    node: UPDATE_EMAIL_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_EMAIL_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-email/update-email.component.ts
  {
    node: UPDATE_EMAIL_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_EMAIL_FORM_COMPONENT}' was removed. For replacement use '${UPDATE_EMAIL_COMPONENT}' from ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-email/update-email-form/update-email-form.component.ts
  {
    node: UPDATE_EMAIL_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_EMAIL_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-password/update-password.module.ts
  {
    node: UPDATE_PASSWORD_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PASSWORD_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-password/components/update-password-form/update-password-form.component.ts
  {
    node: UPDATE_PASSWORD_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PASSWORD_FORM_COMPONENT}' was removed. For replacement use '${UPDATE_PASSWORD_COMPONENT}' from ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-password/components/update-password/update-password.component.ts
  {
    node: UPDATE_PASSWORD_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PASSWORD_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-profile/update-profile.module.ts
  {
    node: UPDATE_PROFILE_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PROFILE_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-profile/update-profile.component.ts
  {
    node: UPDATE_PROFILE_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PROFILE_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}. Logic for this component was changed. For more details please look into 4.0 migration documentation.`,
  },
  // projects/core/src/routing/store/actions/router.action.ts
  {
    node: ROUTING_ACTIONS,
    importPath: SPARTACUS_CORE,
    comment: `The following ngrx '${ROUTING_ACTIONS}' have been removed: '${ROUTE_GO_ACTION}', '${ROUTE_GO_BY_URL_ACTION}', '${ROUTE_BACK_ACTION}' and '${ROUTE_FORWARD_ACTION}'. Please use instead the methods of the ${ROUTING_SERVICE}, respectively: 'go()', 'goByUrl()', 'back()' and 'forward()'.`,
  },
  {
    node: 'PageEventModule',
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'PageEventModule' was removed, please use 'NavigationEventModule' from '${SPARTACUS_STOREFRONTLIB}' instead.`,
  },
  {
    node: 'PageEventBuilder',
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'PageEventBuilder' was removed, please use 'NavigationEventBuilder' from '${SPARTACUS_STOREFRONTLIB}' instead.`,
  },
  {
    node: 'EventsModule',
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'EventsModule' was removed, please use individual imports instead. (e.g. CartPageEventModule, ProductPageEventModule, etc.)`,
  },
  // feature-libs/storefinder/core/facade/store-data.service.ts
  {
    node: STORE_DATA_SERVICE,
    importPath: SPARTACUS_STOREFINDER,
    comment: `'StoreDataService' was removed, please use 'StoreFinderService' from '${SPARTACUS_STOREFINDER} instead.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
