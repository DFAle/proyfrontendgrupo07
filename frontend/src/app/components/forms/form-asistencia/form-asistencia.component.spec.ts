import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAsistenciaComponent } from './form-asistencia.component';

describe('FormAsistenciaComponent', () => {
  let component: FormAsistenciaComponent;
  let fixture: ComponentFixture<FormAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAsistenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
