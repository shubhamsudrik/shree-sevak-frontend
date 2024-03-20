import { TestBed } from '@angular/core/testing';

import { SchedulePeopleBaithakService } from './schedule-people-baithak.service';

describe('SchedulePeopleBaithakService', () => {
  let service: SchedulePeopleBaithakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulePeopleBaithakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
