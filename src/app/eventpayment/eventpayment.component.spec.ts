import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventpaymentComponent } from './eventpayment.component';

describe('EventpaymentComponent', () => {
  let component: EventpaymentComponent;
  let fixture: ComponentFixture<EventpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
