import { TestBed } from '@angular/core/testing';

import { DoctorServices } from './doctor-services';

describe('DoctorServices', () => {
  let service: DoctorServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
