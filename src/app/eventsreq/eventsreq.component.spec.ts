import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsreqComponent } from './eventsreq.component';

describe('EventsreqComponent', () => {
  let component: EventsreqComponent;
  let fixture: ComponentFixture<EventsreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsreqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
