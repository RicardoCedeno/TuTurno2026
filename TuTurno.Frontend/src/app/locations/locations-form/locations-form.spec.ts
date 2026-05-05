import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationsForm } from './locations-form';

describe('LocationsForm', () => {
  let component: LocationsForm;
  let fixture: ComponentFixture<LocationsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
