import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitaBookingComponent } from './gita-booking.component';

describe('GitaBookingComponent', () => {
  let component: GitaBookingComponent;
  let fixture: ComponentFixture<GitaBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitaBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitaBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
