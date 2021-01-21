import { TestBed } from '@angular/core/testing';

import { BookinstanceApiService } from './bookinstance-api.service';

describe('BookinstanceApiService', () => {
  let service: BookinstanceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookinstanceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
