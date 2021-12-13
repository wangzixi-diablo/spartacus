import {
  ChangeDetectionStrategy,
  Directive,
  Input,
  Pipe,
  PipeTransform,
  Component,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { defaultConfiguratorUISettingsConfig } from '../../../config/default-configurator-ui-settings.config';
import { ConfiguratorAttributeNumericInputFieldComponent } from './configurator-attribute-numeric-input-field.component';
import { ConfiguratorAttributeNumericInputFieldService } from './configurator-attribute-numeric-input-field.component.service';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: any;
}

let DEBOUNCE_TIME: number;

const userInput = '345.00';

const attribute: Configurator.Attribute = {
  name: 'attributeName',
  uiType: Configurator.UiType.NUMERIC,
  userInput: userInput,
  numDecimalPlaces: 2,
  numTotalLength: 10,
  negativeAllowed: false,
};

const attributeWoNumericalMetadata: Configurator.Attribute = {
  name: 'attributeName',
  uiType: Configurator.UiType.NUMERIC,
  userInput: userInput,
};

function checkForValidationMessage(
  component: ConfiguratorAttributeNumericInputFieldComponent,
  fixture: ComponentFixture<ConfiguratorAttributeNumericInputFieldComponent>,
  htmlElem: HTMLElement,
  expectedMessages: any
) {
  component.attributeInputForm.markAsDirty();

  fixture.detectChanges();
  const validationDiv = htmlElem.getElementsByClassName('cx-validation-msg');
  expect(validationDiv).toBeDefined();
  expect(validationDiv.length).toBe(expectedMessages);
}

describe('ConfigAttributeNumericInputFieldComponent', () => {
  let component: ConfiguratorAttributeNumericInputFieldComponent;

  let fixture: ComponentFixture<ConfiguratorAttributeNumericInputFieldComponent>;
  let mockLanguageService;
  const locale = 'en';
  let htmlElem: HTMLElement;
  let configuratorAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService;

  beforeEach(
    waitForAsync(() => {
      mockLanguageService = {
        getAll: () => of([]),
        getActive: jasmine.createSpy().and.returnValue(of(locale)),
        setActive: jasmine.createSpy(),
      };
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeNumericInputFieldComponent,
          MockTranslateUrlPipe,
          MockFocusDirective,
          MockCxIconComponent,
        ],
        imports: [ReactiveFormsModule],
        providers: [
          { provide: LanguageService, useValue: mockLanguageService },
          {
            provide: ConfiguratorUISettingsConfig,
            useValue: defaultConfiguratorUISettingsConfig,
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeNumericInputFieldComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeNumericInputFieldComponent
    );
    configuratorAttributeNumericInputFieldService = TestBed.inject(
      ConfiguratorAttributeNumericInputFieldService
    );

    component = fixture.componentInstance;
    component.attribute = attribute;
    component.language = locale;
    fixture.detectChanges();
    htmlElem = fixture.nativeElement;
    spyOn(component.inputChange, 'emit');
    spyOn(
      configuratorAttributeNumericInputFieldService,
      'getPatternForValidationMessage'
    );
    DEBOUNCE_TIME =
      defaultConfiguratorUISettingsConfig.productConfigurator
        ?.updateDebounceTime?.input ?? component['FALLBACK_DEBOUNCE_TIME'];
  });

  function checkForValidity(
    input: string,
    negativeAllowed: boolean,
    isValid: boolean
  ) {
    component.attribute.negativeAllowed = negativeAllowed;
    component.ngOnInit();
    component.attributeInputForm.setValue(input);
    checkForValidationMessage(component, fixture, htmlElem, isValid ? 0 : 1);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value on init', () => {
    component.ngOnInit();
    expect(component.attributeInputForm.value).toEqual(userInput);
  });

  it('should call service for pattern generation with meta data from attribute', () => {
    component.ngOnInit();
    expect(
      configuratorAttributeNumericInputFieldService.getPatternForValidationMessage
    ).toHaveBeenCalledWith(
      component.attribute.numDecimalPlaces,
      component.attribute.numTotalLength,
      component.attribute.negativeAllowed,
      'en'
    );
  });

  it('should call service for pattern generation with defaults in case attribute does not carry meta data', () => {
    component.attribute = attributeWoNumericalMetadata;
    component.ngOnInit();
    const defaultSettings = component['getDefaultSettings']();
    expect(
      configuratorAttributeNumericInputFieldService.getPatternForValidationMessage
    ).toHaveBeenCalledWith(
      defaultSettings.numDecimalPlaces,
      defaultSettings.numTotalLength,
      defaultSettings.negativeAllowed,
      'en'
    );
  });

  it('should display no validation issue if input is fine, an unknown locale was requested, and we fall back to en locale', () => {
    component.language = 'unknown locale';
    component.ngOnInit();
    checkForValidationMessage(component, fixture, htmlElem, 0);
  });

  it('should display a validation issue if alphanumeric characters occur', () => {
    checkForValidity('122A23', false, false);
  });

  it('should display a validation issue if negative sign is included but not allowed to', () => {
    checkForValidity('-122323', false, false);
  });

  it('should display no validation issue if negative sign is included and allowed', () => {
    checkForValidity('-122323', true, true);
  });

  it('should display a validation issue if input is too long', () => {
    checkForValidity('123456789.34', false, false);
  });

  it('should display a validation issue if input is too long and negatives allowed', () => {
    checkForValidity('123456789.34', true, false);
  });

  it('should display no validation issue if input length matches meta data exactly', () => {
    checkForValidity('12345678.34', false, true);
  });

  it('should display no validation issue if input length matches meta data exactly and negatives are allowed', () => {
    checkForValidity('12345678.34', true, true);
  });

  it('should display no validation issue for negative value if input length matches meta data exactly and negatives are allowed', () => {
    checkForValidity('-12345678.34', true, true);
  });

  it('should display no validation issue for single minus if negatives are allowed', () => {
    checkForValidity('-', true, true);
  });

  it('should not set control value in case the model attribute does not carry a value', () => {
    component.attribute.userInput = undefined;
    component.ngOnInit();
    expect(component.attributeInputForm.value).toBe('');
  });

  it('should raise event in case input was changed', () => {
    component.onChange();
    expect(component.inputChange.emit).toHaveBeenCalled();
  });

  it('should raise no event in case input was changed and control is invalid', () => {
    component.ngOnInit();
    component.attributeInputForm.setValue('122A23');
    component.onChange();
    expect(component.inputChange.emit).toHaveBeenCalledTimes(0);
  });

  it('should delay emit inputValue for debounce period', fakeAsync(() => {
    component.attributeInputForm.setValue('123');
    fixture.detectChanges();
    expect(component.inputChange.emit).not.toHaveBeenCalled();
    tick(DEBOUNCE_TIME);
    expect(component.inputChange.emit).toHaveBeenCalled();
  }));

  it('should only emit once with last value if inputValue is changed within debounce period', fakeAsync(() => {
    component.attributeInputForm.setValue('123');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME / 2);
    component.attributeInputForm.setValue('123456');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME / 2);
    expect(component.inputChange.emit).not.toHaveBeenCalled();
    tick(DEBOUNCE_TIME);
    expect(component.inputChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        changedAttribute: jasmine.objectContaining({
          userInput: '123456',
        }),
      })
    );
  }));

  it('should emit twice if inputValue is changed after debounce period', fakeAsync(() => {
    component.attributeInputForm.setValue('123');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME);
    component.attributeInputForm.setValue('123456');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME);
    expect(component.inputChange.emit).toHaveBeenCalledTimes(2);
  }));

  it('should not emit inputValue after destroy', fakeAsync(() => {
    component.attributeInputForm.setValue('123');
    fixture.detectChanges();
    component.ngOnDestroy();
    tick(DEBOUNCE_TIME);
    expect(component.inputChange.emit).not.toHaveBeenCalled();
  }));
});
