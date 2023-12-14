import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEstadoProyectoComponent } from './select-estado-proyecto.component';

describe('SelectEstadoProyectoComponent', () => {
  let component: SelectEstadoProyectoComponent;
  let fixture: ComponentFixture<SelectEstadoProyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectEstadoProyectoComponent]
    });
    fixture = TestBed.createComponent(SelectEstadoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
