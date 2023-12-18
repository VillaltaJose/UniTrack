import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMovimientoComponent } from './nuevo-movimiento.component';

describe('NuevoMovimientoComponent', () => {
  let component: NuevoMovimientoComponent;
  let fixture: ComponentFixture<NuevoMovimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoMovimientoComponent]
    });
    fixture = TestBed.createComponent(NuevoMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
