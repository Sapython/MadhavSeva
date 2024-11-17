import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineBookingsComponent } from './offline-bookings.component';

describe('OfflineBookingsComponent', () => {
  let component: OfflineBookingsComponent;
  let fixture: ComponentFixture<OfflineBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfflineBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
