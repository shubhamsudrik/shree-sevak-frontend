import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBaithakComponent } from './update-baithak.component';

describe('UpdateBaithakComponent', () => {
  let component: UpdateBaithakComponent;
  let fixture: ComponentFixture<UpdateBaithakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBaithakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBaithakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
