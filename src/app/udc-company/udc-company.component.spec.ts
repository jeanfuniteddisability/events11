import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdcCompanyComponent } from './udc-company.component';

describe('UdcCompanyComponent', () => {
  let component: UdcCompanyComponent;
  let fixture: ComponentFixture<UdcCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdcCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UdcCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
