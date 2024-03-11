import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleBaithakComponent } from './people-baithak.component';

describe('PeopleBaithakComponent', () => {
  let component: PeopleBaithakComponent;
  let fixture: ComponentFixture<PeopleBaithakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleBaithakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleBaithakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
