import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUDCComponent } from './register-udc.component';

describe('RegisterUDCComponent', () => {
  let component: RegisterUDCComponent;
  let fixture: ComponentFixture<RegisterUDCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUDCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUDCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
