import { TestBed } from '@angular/core/testing';

import { ServicioRegistroActividadService } from './servicio-registro-actividad.service';

describe('ServicioRegistroActividadService', () => {
  let service: ServicioRegistroActividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioRegistroActividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
