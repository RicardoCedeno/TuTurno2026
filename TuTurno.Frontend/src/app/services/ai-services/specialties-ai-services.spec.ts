import { TestBed } from '@angular/core/testing';

import { SpecialtiesAiServices } from './specialties-ai-services';

describe('SpecialtiesAiServices', () => {
  let service: SpecialtiesAiServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialtiesAiServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
