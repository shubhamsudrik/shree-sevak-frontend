import { TestBed } from '@angular/core/testing';

import { PepoleBaithakService } from './pepole-baithak.service';

describe('PepoleBaithakService', () => {
  let service: PepoleBaithakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PepoleBaithakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
