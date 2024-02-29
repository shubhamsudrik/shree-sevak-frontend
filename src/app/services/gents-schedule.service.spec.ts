import { TestBed } from '@angular/core/testing';

import { GentsScheduleService } from './gents-schedule.service';

describe('GentsScheduleService', () => {
  let service: GentsScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GentsScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
