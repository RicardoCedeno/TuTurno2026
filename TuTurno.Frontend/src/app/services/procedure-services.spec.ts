import { TestBed } from '@angular/core/testing';

import { ProcedureServices } from './procedure-services';

describe('ProcedureServices', () => {
  let service: ProcedureServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcedureServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
