import { Component, inject, signal } from '@angular/core';
import { SpecialtiesServices } from '../../services/specialties-services';
import { ISpecialty } from '../../models/specialty';
import { AlertsService } from '../../services/alerts-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorsForm } from '../doctors-form/doctors-form';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule, FormsModule, DoctorsForm],
  standalone: true,
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors {
  private specialtiesServices = inject(SpecialtiesServices);
  specialties: ISpecialty[] = [];
  loading = signal<boolean>(false);
  selectedSpecialtyId = signal<string | null>(null);
  mode = signal<'list' | 'create' | 'update' | null>('list');
  private alertsService = inject(AlertsService);
  
  constructor() {
  }

  ngOnInit() {
    this.getSpecialties();
  }

  getSpecialties() {
    this.loading.set(true);
    this.specialtiesServices.getSpecialties().subscribe({
      next: (response) => {
        if(response.success){
          this.specialties = response.data;
        } else {
          this.alertsService.showErrorAlert(response.errors.join(', '));
        }
      },
      error: (error: any) => {
        this.alertsService.showErrorAlert(error.message);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  onConsultar() {
    if (!this.selectedSpecialtyId()) {
      this.alertsService.showErrorAlert('Por favor selecciona una especialidad');
      return;
    }
    console.log('Consultando médicos para la especialidad:', this.selectedSpecialtyId());
    // Aquí iría la lógica para filtrar la lista de médicos
  }

  onNuevoMedico() {
    console.log('Navegando a la creación de nuevo médico');
    this.mode.set('create');
  }
}
