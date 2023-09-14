import { TestBed } from '@angular/core/testing';

import { BaithakDataService } from './baithak-data.service';

describe('LocationDataService', () => {
  let service: BaithakDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaithakDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
