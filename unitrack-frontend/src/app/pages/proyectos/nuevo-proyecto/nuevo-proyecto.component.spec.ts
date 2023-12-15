import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProyectoComponent } from './nuevo-proyecto.component';

describe('NuevoProyectoComponent', () => {
  let component: NuevoProyectoComponent;
  let fixture: ComponentFixture<NuevoProyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoProyectoComponent]
    });
    fixture = TestBed.createComponent(NuevoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
