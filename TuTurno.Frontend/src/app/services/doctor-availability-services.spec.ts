import { TestBed } from '@angular/core/testing';

import { DoctorAvailabilityServices } from './doctor-availability-services';

describe('DoctorAvailabilityServices', () => {
  let service: DoctorAvailabilityServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorAvailabilityServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
