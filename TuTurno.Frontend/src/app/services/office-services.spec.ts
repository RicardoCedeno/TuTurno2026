import { TestBed } from '@angular/core/testing';
import { OfficeServices } from './office-services';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('OfficeServices', () => {
  let service: OfficeServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OfficeServices,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(OfficeServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
