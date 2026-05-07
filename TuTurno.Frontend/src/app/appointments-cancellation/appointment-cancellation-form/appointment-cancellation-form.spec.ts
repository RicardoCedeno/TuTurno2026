import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCancellationForm } from './appointment-cancellation-form';

describe('AppointmentCancellationForm', () => {
  let component: AppointmentCancellationForm;
  let fixture: ComponentFixture<AppointmentCancellationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentCancellationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentCancellationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
