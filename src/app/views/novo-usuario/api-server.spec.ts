import { TestBed } from '@angular/core/testing';

import { ApiServer } from './api-server';

describe('ApiServer', () => {
  let service: ApiServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
