import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleSchedularMasterComponent } from './people-schedular-master.component';

describe('PeopleSchedularMasterComponent', () => {
  let component: PeopleSchedularMasterComponent;
  let fixture: ComponentFixture<PeopleSchedularMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleSchedularMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleSchedularMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
