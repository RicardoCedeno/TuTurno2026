import { TestBed } from '@angular/core/testing';
import { LocationServices } from './location-services';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LocationServices', () => {
  let service: LocationServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocationServices,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(LocationServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
