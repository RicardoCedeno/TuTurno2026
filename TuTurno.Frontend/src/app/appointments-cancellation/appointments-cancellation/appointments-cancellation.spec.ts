import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsCancellation } from './appointments-cancellation';

describe('AppointmentsCancellation', () => {
  let component: AppointmentsCancellation;
  let fixture: ComponentFixture<AppointmentsCancellation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsCancellation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsCancellation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
