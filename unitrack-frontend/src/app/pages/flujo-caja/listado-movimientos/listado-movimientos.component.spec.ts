import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMovimientosComponent } from './listado-movimientos.component';

describe('ListadoMovimientosComponent', () => {
  let component: ListadoMovimientosComponent;
  let fixture: ComponentFixture<ListadoMovimientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoMovimientosComponent]
    });
    fixture = TestBed.createComponent(ListadoMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
