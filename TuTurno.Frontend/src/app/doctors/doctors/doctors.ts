import { Component, inject, signal, OnInit } from '@angular/core';
import { DoctorsList } from '../doctors-list/doctors-list';
import { CommonModule } from '@angular/common';
import { DoctorsForm } from '../doctors-form/doctors-form';
import { AlertsService } from '../../services/alerts-service';
import { DataServices } from '../../services/data-services';
import { IDoctor } from '../../models/doctor';
import { DoctorServices } from '../../services/doctor-services';

@Component({
  selector: 'app-doctors',
  imports: [DoctorsList, CommonModule, DoctorsForm],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
  standalone: true,
})
export class Doctors implements OnInit {
  private doctorServices = inject(DoctorServices);
  doctors = signal<IDoctor[]>([]);
  loading = signal<boolean>(false);
  mode = signal<'list' | 'create' | 'update' | null>('list');
  private alertsService = inject(AlertsService);
  private dataServices = inject(DataServices<IDoctor>);

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.loading.set(true);
    this.doctorServices.getDoctors().subscribe({
      next: (response) => {
        console.log(response);
        if (response.success) {
          this.doctors.set(response.data);
        } else {
          this.alertsService.showErrorAlert(`Error al obtener médicos: ${response.errors.join(', ')}`);
        }
      },
      error: (error: any) => {
        this.alertsService.showErrorAlert(`Error al obtener médicos: ${error.message}`);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  onAddDoctor() {
    this.dataServices.clearSelectedItem();
    this.mode.set('create');
  }

  createDoctor(doctor: IDoctor) {
    console.log(doctor);
    this.loading.set(true);
    this.doctorServices.createDoctor(doctor).subscribe({
      next: (response) => {
        if (response.success) {
          this.alertsService.showSuccessAlert('Médico creado correctamente');
          this.mode.set('list');
          this.getDoctors();
        } else {
          this.alertsService.showErrorAlert(`Error al crear el médico: ${response.errors.join(', ')}`);
        }
      },
      error: (error: any) => {
        this.alertsService.showErrorAlert(`Error al crear el médico: ${error.message}`);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  onCancel(mode: 'list' | 'create' | 'update') {
    this.mode.set(mode);
    if (mode === 'list') {
      this.dataServices.clearSelectedItem();
    }
  }

  deleteDoctor(id: string) {
    this.alertsService.showQuestionAlert('¿Estás seguro de querer eliminar este médico?').then((result: any) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        this.doctorServices.deleteDoctor(id).subscribe({
          next: (response) => {
            if (response.success) {
              this.alertsService.showSuccessAlert('Médico eliminado correctamente');
              this.getDoctors();
            } else {
              this.alertsService.showErrorAlert(`Error al eliminar el médico: ${response.errors.join(', ')}`);
            }
          },
          error: (error: any) => {
            this.alertsService.showErrorAlert(`Error al eliminar el médico: ${error.message}`);
          },
          complete: () => {
            this.loading.set(false);
          }
        });
      }
    });
  }

  onEditDoctor(doctor: IDoctor) {
    this.dataServices.setSelectedItem(doctor);
    this.mode.set('update');
  }

  updateDoctor(doctor: IDoctor) {
    this.alertsService.showQuestionAlert('¿Estás seguro de querer actualizar este médico?').then((result: any) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        this.doctorServices.updateDoctor(doctor).subscribe({
          next: (response) => {
            if (response.success) {
              this.alertsService.showSuccessAlert('Médico actualizado correctamente');
              this.mode.set('list');
              this.getDoctors();
            } else {
              this.alertsService.showErrorAlert(`Error al actualizar el médico: ${response.errors.join(', ')}`);
            }
          },
          error: (error: any) => {
            this.alertsService.showErrorAlert(`Error al actualizar el médico: ${error.message}`);
          },
          complete: () => {
            this.loading.set(false);
          }
        });
      }
    });
  }
}
