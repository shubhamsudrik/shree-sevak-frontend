import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGentComponent } from './dynamic-gent.component';

describe('DynamicGentComponent', () => {
  let component: DynamicGentComponent;
  let fixture: ComponentFixture<DynamicGentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicGentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicGentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
