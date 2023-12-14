import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDirectivaComponent } from './select-directiva.component';

describe('SelectDirectivaComponent', () => {
  let component: SelectDirectivaComponent;
  let fixture: ComponentFixture<SelectDirectivaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectDirectivaComponent]
    });
    fixture = TestBed.createComponent(SelectDirectivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
