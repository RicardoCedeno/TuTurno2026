import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsCancellationList } from './appointments-cancellation-list';

describe('AppointmentsCancellationList', () => {
  let component: AppointmentsCancellationList;
  let fixture: ComponentFixture<AppointmentsCancellationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsCancellationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsCancellationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
