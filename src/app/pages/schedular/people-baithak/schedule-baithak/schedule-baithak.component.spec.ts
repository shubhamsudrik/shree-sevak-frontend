import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBaithakComponent } from './schedule-baithak.component';

describe('ScheduleBaithakComponent', () => {
  let component: ScheduleBaithakComponent;
  let fixture: ComponentFixture<ScheduleBaithakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleBaithakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleBaithakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
