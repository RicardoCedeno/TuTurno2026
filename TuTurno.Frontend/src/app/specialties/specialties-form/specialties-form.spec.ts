import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesForm } from './specialties-form';

describe('SpecialtiesForm', () => {
  let component: SpecialtiesForm;
  let fixture: ComponentFixture<SpecialtiesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialtiesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialtiesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
