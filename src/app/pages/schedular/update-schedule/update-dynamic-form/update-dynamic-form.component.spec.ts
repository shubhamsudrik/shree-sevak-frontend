import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDynamicFormComponent } from './update-dynamic-form.component';

describe('UpdateDynamicFormComponent', () => {
  let component: UpdateDynamicFormComponent;
  let fixture: ComponentFixture<UpdateDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDynamicFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
