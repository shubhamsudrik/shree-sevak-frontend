import { TestBed } from '@angular/core/testing';

import { AreaDataService } from './area-data.service';

describe('AreaDataService', () => {
  let service: AreaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
