import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleGentsBaithakComponent } from './schedule-gents-baithak.component';

describe('ScheduleGentsBaithakComponent', () => {
  let component: ScheduleGentsBaithakComponent;
  let fixture: ComponentFixture<ScheduleGentsBaithakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleGentsBaithakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleGentsBaithakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
