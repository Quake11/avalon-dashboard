import { TestBed } from '@angular/core/testing';

import { ForegroundsService } from './foregrounds.service';

describe('ForegroundsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForegroundsService = TestBed.get(ForegroundsService);
    expect(service).toBeTruthy();
  });
});
