import { TestBed } from '@angular/core/testing';

import { AppointmentCancellationServices } from './appointment-cancellation-services';

describe('AppointmentCancellationServices', () => {
  let service: AppointmentCancellationServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentCancellationServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
