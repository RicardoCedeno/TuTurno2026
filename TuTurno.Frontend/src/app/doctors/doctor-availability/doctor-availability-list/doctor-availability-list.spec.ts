import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAvailabilityList } from './doctor-availability-list';

describe('DoctorAvailabilityList', () => {
  let component: DoctorAvailabilityList;
  let fixture: ComponentFixture<DoctorAvailabilityList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAvailabilityList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAvailabilityList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
