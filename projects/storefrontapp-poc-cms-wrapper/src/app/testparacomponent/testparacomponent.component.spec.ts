import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestparacomponentComponent } from './testparacomponent.component';

describe('TestparacomponentComponent', () => {
  let component: TestparacomponentComponent;
  let fixture: ComponentFixture<TestparacomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestparacomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestparacomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
