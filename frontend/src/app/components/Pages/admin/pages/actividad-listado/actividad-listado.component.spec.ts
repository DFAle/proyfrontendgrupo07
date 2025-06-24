import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadListadoComponent } from './actividad-listado.component';

describe('ActividadListadoComponent', () => {
  let component: ActividadListadoComponent;
  let fixture: ComponentFixture<ActividadListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
