import { TestBed } from '@angular/core/testing';

import { ServicioRolService } from './servicio-rol.service';

describe('ServicioRolService', () => {
  let service: ServicioRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
