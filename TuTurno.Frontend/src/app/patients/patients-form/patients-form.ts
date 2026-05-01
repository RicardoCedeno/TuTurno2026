import { Component, effect, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IPatient } from '../../models/patient';
import { DataServices } from '../../services/data-services';

type PatientFormValues = Partial<Omit<IPatient, 'birthDate'>> & { birthDate?: string };

@Component({
  selector: 'app-patients-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients-form.html',
  styleUrl: './patients-form.css',
})
export class PatientsForm {
  createPatient = output<IPatient>();
  updatePatient = output<IPatient>();
  cancel = output<'list' | 'create' | 'update'>();
  mode = input<'list' | 'create' | 'update' | null>(null);

  buttonLabel = 'Guardar';
  formValues: PatientFormValues = {
    id: '',
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: 'Argentina',
    active: true,
  };

  private dataServices = inject(DataServices<IPatient>);

  constructor() {
    effect(() => {
      const currentMode = this.mode();
      const selected = this.dataServices.selectedItem();

      if (currentMode === 'update' && selected) {
        this.formValues = {
          ...selected,
          birthDate: this.formatBirthDate(selected.birthDate),
        };
        this.buttonLabel = 'Actualizar';
      } else if (currentMode === 'create') {
        this.resetForm();
        this.buttonLabel = 'Agregar';
      }
    });
  }

  private resetForm() {
    this.formValues = {
      id: '',
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      country: 'Argentina',
      active: true,
    };
  }

  private formatBirthDate(value: Date | string | undefined): string {
    if (!value) {
      return '';
    }
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) {
      return '';
    }
    return date.toISOString().split('T')[0];
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const current = this.formValues;
    const payload: IPatient = {
      id: current.id ?? '',
      name: current.name?.trim() ?? '',
      email: current.email?.trim() ?? '',
      phone: current.phone?.trim() ?? '',
      birthDate: current.birthDate ? new Date(current.birthDate) : new Date(),
      gender: current.gender ?? '',
      address: current.address ?? '',
      city: current.city ?? '',
      state: current.state ?? '',
      country: current.country ?? 'Argentina',
      active: current.active ?? true,
    };

    if (this.mode() === 'create') {
      this.createPatient.emit(payload);
    } else if (this.mode() === 'update') {
      const selected = this.dataServices.getSelectedItem();
      if (selected) {
        const updated: IPatient = { ...selected, ...payload };
        this.updatePatient.emit(updated);
      } else {
        this.cancel.emit('list');
      }
    }
  }

  onCancel() {
    this.cancel.emit('list');
  }
}
