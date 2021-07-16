import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { FormErrorsModule } from '../../../../shared/index';
import { IconModule } from '../../../misc/icon/index';
import { AddressFormComponent } from './address-form.component';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';

/**
 * @deprecated since 4.1, moved to @spartacus/user package.
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgSelectModule,
    IconModule,
    I18nModule,
    FormErrorsModule,
  ],
  declarations: [AddressFormComponent, SuggestedAddressDialogComponent],
  exports: [AddressFormComponent, SuggestedAddressDialogComponent],
})
export class AddressFormModule {}
