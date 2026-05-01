import { Component, inject, OnInit, signal } from '@angular/core';
import { PatientsList } from '../patients-list/patients-list';
import { PatientsForm } from '../patients-form/patients-form';
import { CommonModule } from '@angular/common';
import { PatientServices } from '../../services/patient-services';
import { AlertsService } from '../../services/alerts-service';
import { DataServices } from '../../services/data-services';
import { IPatient } from '../../models/patient';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [PatientsList, CommonModule, PatientsForm],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class Patients implements OnInit {
  private patientServices = inject(PatientServices);
  private alertsService = inject(AlertsService);
  private dataServices = inject(DataServices<IPatient>);

  patients = signal<IPatient[]>([]);
  loading = signal(false);
  mode = signal<'list' | 'create' | 'update'>('list');

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.loading.set(true);
    this.patientServices.getPatients().subscribe({
      next: (response) => {
        if (response.success) {
          this.patients.set(response.data);
        } else {
          this.alertsService.showErrorAlert(`Error al obtener pacientes: ${response.errors.join(', ')}`);
        }
      },
      error: (error: any) => {
        this.alertsService.showErrorAlert(`Error al obtener pacientes: ${error.message}`);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  onAddPatient() {
    this.dataServices.clearSelectedItem();
    this.mode.set('create');
  }

  createPatient(patient: IPatient) {
    this.loading.set(true);
    this.patientServices.createPatient(patient).subscribe({
      next: (response) => {
        if (response.success) {
          this.alertsService.showSuccessAlert('Paciente creado correctamente');
          this.mode.set('list');
          this.getPatients();
        } else {
          this.alertsService.showErrorAlert(`Error al crear paciente: ${response.errors.join(', ')}`);
        }
      },
      error: (error: any) => {
        this.alertsService.showErrorAlert(`Error al crear paciente: ${error.message}`);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  deletePatient(id: string) {
    this.alertsService.showQuestionAlert('¿Seguro querés eliminar este paciente?').then((result: any) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        this.patientServices.deletePatient(id).subscribe({
          next: (response) => {
            if (response.success) {
              this.alertsService.showSuccessAlert('Paciente eliminado correctamente');
              this.getPatients();
            } else {
              this.alertsService.showErrorAlert(`Error al eliminar paciente: ${response.errors.join(', ')}`);
            }
          },
          error: (error: any) => {
            this.alertsService.showErrorAlert(`Error al eliminar paciente: ${error.message}`);
          },
          complete: () => {
            this.loading.set(false);
          }
        });
      }
    });
  }

  onEditPatient(patient: IPatient) {
    this.dataServices.setSelectedItem(patient);
    this.mode.set('update');
  }

  updatePatient(patient: IPatient) {
    this.alertsService.showQuestionAlert('¿Querés actualizar este paciente?').then((result: any) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        this.patientServices.updatePatient(patient).subscribe({
          next: (response) => {
            if (response.success) {
              this.alertsService.showSuccessAlert('Paciente actualizado correctamente');
              this.mode.set('list');
              this.getPatients();
            } else {
              this.alertsService.showErrorAlert(`Error al actualizar paciente: ${response.errors.join(', ')}`);
            }
          },
          error: (error: any) => {
            this.alertsService.showErrorAlert(`Error al actualizar paciente: ${error.message}`);
          },
          complete: () => {
            this.loading.set(false);
          }
        });
      }
    });
  }

  onCancel(mode: 'list' | 'create' | 'update') {
    this.mode.set(mode);
    if (mode === 'list') {
      this.dataServices.clearSelectedItem();
    }
  }
}
