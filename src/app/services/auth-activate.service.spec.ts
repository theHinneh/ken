import { TestBed } from '@angular/core/testing';

import { AuthActivateService } from './auth-activate.service';

describe('AuthActivateService', () => {
  let service: AuthActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
