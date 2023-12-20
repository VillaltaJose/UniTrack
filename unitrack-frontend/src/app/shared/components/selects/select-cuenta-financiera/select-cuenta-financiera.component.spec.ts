import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCuentaFinancieraComponent } from './select-cuenta-financiera.component';

describe('SelectCuentaFinancieraComponent', () => {
  let component: SelectCuentaFinancieraComponent;
  let fixture: ComponentFixture<SelectCuentaFinancieraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCuentaFinancieraComponent]
    });
    fixture = TestBed.createComponent(SelectCuentaFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
