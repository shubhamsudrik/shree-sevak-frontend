import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchedularComponent } from './add-schedular.component';

describe('AddSchedularComponent', () => {
  let component: AddSchedularComponent;
  let fixture: ComponentFixture<AddSchedularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSchedularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSchedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
