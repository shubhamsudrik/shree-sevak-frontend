import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GentsLadiesSchedularMasterComponent } from './gents-ladies-schedular-master.component';

describe('GentsLadiesSchedularMasterComponent', () => {
  let component: GentsLadiesSchedularMasterComponent;
  let fixture: ComponentFixture<GentsLadiesSchedularMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GentsLadiesSchedularMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GentsLadiesSchedularMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
