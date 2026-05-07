import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAvailabilityForm } from './doctor-availability-form';

describe('DoctorAvailabilityForm', () => {
  let component: DoctorAvailabilityForm;
  let fixture: ComponentFixture<DoctorAvailabilityForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAvailabilityForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAvailabilityForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
