import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySevaComponent } from './buy-seva.component';

describe('BuySevaComponent', () => {
  let component: BuySevaComponent;
  let fixture: ComponentFixture<BuySevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuySevaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuySevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
