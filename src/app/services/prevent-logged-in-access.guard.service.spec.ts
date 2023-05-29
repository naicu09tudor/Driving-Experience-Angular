import { TestBed } from '@angular/core/testing';

import { PreventLoggedInAccessGuardService } from './prevent-logged-in-access.guard.service';

describe('PreventLoggedInAccessGuardService', () => {
  let service: PreventLoggedInAccessGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventLoggedInAccessGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
