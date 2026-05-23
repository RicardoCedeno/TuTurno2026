import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresForm } from './procedures-form';

describe('ProceduresForm', () => {
  let component: ProceduresForm;
  let fixture: ComponentFixture<ProceduresForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduresForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceduresForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
