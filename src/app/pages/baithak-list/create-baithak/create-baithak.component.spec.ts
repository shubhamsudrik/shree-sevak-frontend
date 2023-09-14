import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBaithakComponent } from './create-baithak.component';

describe('CreateBaithakComponent', () => {
  let component: CreateBaithakComponent;
  let fixture: ComponentFixture<CreateBaithakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBaithakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBaithakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
