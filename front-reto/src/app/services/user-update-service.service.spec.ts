import { TestBed } from '@angular/core/testing';

import { UserUpdateServiceService } from './user-update-service.service';

describe('UserUpdateServiceService', () => {
  let service: UserUpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
