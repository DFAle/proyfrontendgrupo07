import { TestBed } from '@angular/core/testing';

import { ServiceLoginAdminService } from './service-login-admin.service';

describe('ServiceLoginAdminService', () => {
  let service: ServiceLoginAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLoginAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
