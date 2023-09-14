import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaithakListComponent} from './baithak-list.component';

describe('BaithakListComponent', () => {
  let component: BaithakListComponent;
  let fixture: ComponentFixture<BaithakListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaithakListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaithakListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
