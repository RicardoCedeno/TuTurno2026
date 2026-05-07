import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorServices } from '../../../services/doctor-services';
import { DoctorAvailabilityServices } from '../../../services/doctor-availability-services';
import { AlertsService } from '../../../services/alerts-service';
import { IDoctor } from '../../../models/doctor';
import { IDoctorAvailability } from '../../../models/doctorAvailability';
import { DoctorAvailabilityList } from '../doctor-availability-list/doctor-availability-list';
import { DoctorAvailabilityForm } from '../doctor-availability-form/doctor-availability-form';
import weekdaysData from '../../../helpers/jsons/weekdays.json';

@Component({
  selector: 'app-doctor-availability',
  imports: [CommonModule, FormsModule, DoctorAvailabilityList, DoctorAvailabilityForm],
  templateUrl: './doctor-availability.html',
  styleUrl: './doctor-availability.css',
  standalone: true,
})
export class DoctorAvailability implements OnInit {
  private doctorServices = inject(DoctorServices);
  private availabilityServices = inject(DoctorAvailabilityServices);
  private alertsService = inject(AlertsService);

  doctors = signal<IDoctor[]>([]);
  weekdays = signal<any[]>(weekdaysData);
  availabilitySlots = signal<IDoctorAvailability[]>([]);
  loading = signal<boolean>(false);
  selectedDoctorId = signal<string>('');
  mode = signal<'list' | 'form'>('list');

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading.set(true);
    this.doctorServices.getDoctors().subscribe({
      next: (res) => {
        if (res.success) {
          this.doctors.set(res.data);
        } else {
          this.alertsService.showErrorAlert('Error al cargar doctores');
        }
      },
      error: () => this.alertsService.showErrorAlert('Error de conexión al cargar doctores'),
      complete: () => this.loading.set(false)
    });
  }

  consultAvailability() {
    if (!this.selectedDoctorId()) {
      this.alertsService.showWarningAlert('Seleccione un doctor primero');
      return;
    }

    this.loading.set(true);
    this.availabilityServices.getAvailabilityByDoctor(this.selectedDoctorId()).subscribe({
      next: (res) => {
        if (res.success) {
          this.availabilitySlots.set(res.data);
        } else {
          this.alertsService.showErrorAlert('Error al obtener disponibilidad');
        }
      },
      error: () => this.alertsService.showErrorAlert('Error de conexión'),
      complete: () => this.loading.set(false)
    });
  }

  onAdd() {
    if (!this.selectedDoctorId()) {
      this.alertsService.showWarningAlert('Seleccione un doctor primero');
      return;
    }
    this.mode.set('form');
  }

  onSave(slots: IDoctorAvailability[]) {
    this.loading.set(true);
    this.availabilityServices.registerBulkAvailability(slots).subscribe({
      next: (res) => {
        if (res.success) {
          this.alertsService.showSuccessAlert('Disponibilidad guardada correctamente');
          this.mode.set('list');
          this.consultAvailability();
        } else {
          this.alertsService.showErrorAlert(`Error: ${res.errors.join(', ')}`);
        }
      },
      error: () => this.alertsService.showErrorAlert('Error al guardar disponibilidad'),
      complete: () => this.loading.set(false)
    });
  }

  onDelete(id: string) {
    this.alertsService.showQuestionAlert('¿Estás seguro de eliminar este horario?').then((result) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        this.availabilityServices.deleteAvailabilitySlot(id).subscribe({
          next: (res) => {
            if (res.success) {
              this.alertsService.showSuccessAlert('Horario eliminado');
              this.consultAvailability();
            } else {
              this.alertsService.showErrorAlert('Error al eliminar');
            }
          },
          error: () => this.alertsService.showErrorAlert('Error de conexión'),
          complete: () => this.loading.set(false)
        });
      }
    });
  }

  onCancel() {
    this.mode.set('list');
  }
}
