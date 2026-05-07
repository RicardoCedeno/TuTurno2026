import { TestBed } from '@angular/core/testing';

import { DoctorUnavailabilityServices } from './doctor-unavailability-services';

describe('DoctorUnavailabilityServices', () => {
  let service: DoctorUnavailabilityServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorUnavailabilityServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
