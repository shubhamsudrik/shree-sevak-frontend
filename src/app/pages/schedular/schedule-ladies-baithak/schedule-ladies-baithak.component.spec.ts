import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLadiesBaithakComponent } from './schedule-ladies-baithak.component';

describe('ScheduleLadiesBaithakComponent', () => {
  let component: ScheduleLadiesBaithakComponent;
  let fixture: ComponentFixture<ScheduleLadiesBaithakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleLadiesBaithakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleLadiesBaithakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
