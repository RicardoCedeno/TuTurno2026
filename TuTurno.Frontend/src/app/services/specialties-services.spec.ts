import { TestBed } from '@angular/core/testing';

import { SpecialtiesServices } from './specialties-services';

describe('SpecialtiesServices', () => {
  let service: SpecialtiesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialtiesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
