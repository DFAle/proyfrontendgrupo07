import { TestBed } from '@angular/core/testing';

import { LoginFinalService } from './login-final.service';

describe('LoginFinalService', () => {
  let service: LoginFinalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFinalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
