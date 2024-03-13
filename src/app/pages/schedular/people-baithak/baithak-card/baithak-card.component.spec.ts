import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaithakCardComponent } from './baithak-card.component';

describe('BaithakCardComponent', () => {
  let component: BaithakCardComponent;
  let fixture: ComponentFixture<BaithakCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaithakCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaithakCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
