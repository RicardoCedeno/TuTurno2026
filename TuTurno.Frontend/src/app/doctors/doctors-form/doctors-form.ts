import { Component, inject, signal, OnInit, output, input, effect } from '@angular/core';
import { IDoctor } from '../../models/doctor';
import { ISpecialty } from '../../models/specialty';
import { SpecialtiesServices } from '../../services/specialties-services';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertsService } from '../../services/alerts-service';
import { DataServices } from '../../services/data-services';

@Component({
  selector: 'app-doctors-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-form.html',
  styleUrl: './doctors-form.css',
})
export class DoctorsForm implements OnInit {
  createDoctor = output<IDoctor>();
  updateDoctor = output<IDoctor>();
  cancel = output<'list' | 'create' | 'update'>();
  mode = input<'create' | 'update' | 'list' | null>(null);
  
  formValues: Partial<IDoctor> = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    doctorsSpecialties: []
  };
  
  specialties = signal<ISpecialty[]>([]);
  loadingSpecialties = signal(false);
  buttonLabel: string = '';
  
  private specialtiesServices = inject(SpecialtiesServices);
  private alertsService = inject(AlertsService);
  private dataServices = inject(DataServices<IDoctor>);

  constructor() {
    effect(() => {
      const currentMode = this.mode();
      const selected = this.dataServices.selectedItem();
      
      if (currentMode === 'update' && selected) {
        this.formValues = { ...selected };
        this.buttonLabel = 'Actualizar';
      } else if (currentMode === 'create') {
        this.resetForm();
        this.buttonLabel = 'Agregar';
      }
    });
  }

  ngOnInit() {
    this.loadSpecialties();
  }

  resetForm() {
    this.formValues = {
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      doctorsSpecialties: []
    };
  }

  loadSpecialties() {
    this.loadingSpecialties.set(true);
    this.specialtiesServices.getSpecialties().subscribe({
      next: (res) => {
        if (res.success) {
          this.specialties.set(res.data);
        }
      },
      error: (err) => this.alertsService.showErrorAlert(err.message),
      complete: () => this.loadingSpecialties.set(false)
    });
  }

  toggleSpecialty(specialty: ISpecialty) {
    const current = this.formValues.doctorsSpecialties || [];
    const index = current.findIndex(ds => ds.specialtyId === specialty.id);
    
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push({ 
        specialtyId: specialty.id,
        doctorId: this.formValues.id || '',
        specialty: specialty 
      } as any);
    }
    this.formValues.doctorsSpecialties = [...current];
  }

  isSpecialtySelected(specialtyId: string): boolean {
    return !!this.formValues.doctorsSpecialties?.some(ds => ds.specialtyId === specialtyId);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.mode() === 'create') {
        this.createDoctor.emit(this.formValues as IDoctor);
      } else if (this.mode() === 'update') {
        const doctor = this.dataServices.getSelectedItem();
        if (doctor) {
          const updatedDoctor = { ...doctor, ...this.formValues };
          this.updateDoctor.emit(updatedDoctor as IDoctor);
        } else {
          this.alertsService.showWarningAlert('No hay un médico seleccionado');
        }
      }
    }
  }

  onCancel() {
    this.cancel.emit('list');
  }
}
