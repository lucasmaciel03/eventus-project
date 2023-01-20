import { TestBed } from '@angular/core/testing';

import { HttpinterpceptorService } from './httpinterpceptor.service';

describe('HttpinterpceptorService', () => {
  let service: HttpinterpceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpinterpceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
