import { TestBed } from '@angular/core/testing';

import { AdminRouteGuardService } from './admin-route-guard.service';

describe('AdminRouteGuardService', () => {
  let service: AdminRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
