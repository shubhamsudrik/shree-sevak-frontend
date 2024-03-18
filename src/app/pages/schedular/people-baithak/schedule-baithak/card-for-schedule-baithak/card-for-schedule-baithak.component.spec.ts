import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardForScheduleBaithakComponent } from './card-for-schedule-baithak.component';

describe('CardForScheduleBaithakComponent', () => {
  let component: CardForScheduleBaithakComponent;
  let fixture: ComponentFixture<CardForScheduleBaithakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardForScheduleBaithakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardForScheduleBaithakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
