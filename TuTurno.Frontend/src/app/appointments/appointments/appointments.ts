import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientServices } from '../../services/patient-services';
import { DoctorServices } from '../../services/doctor-services';
import { OfficeServices } from '../../services/office-services';
import { AppointmentServices } from '../../services/appointment-services';
import { IPatient } from '../../models/patient';
import { IDoctor } from '../../models/doctor';
import { IOffice } from '../../models/office';
import { IAppointment } from '../../models/appointment';
import { AppointmentsForm } from '../appointments-form/appointments-form';
import { AppointmentsList } from '../appointments-list/appointments-list';
import { AlertsService } from '../../services/alerts-service';

@Component({
  selector: 'app-appointments-container',
  standalone: true,
  imports: [CommonModule, AppointmentsForm, AppointmentsList],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css'
})
export class Appointments implements OnInit {
  private patientServices = inject(PatientServices);
  private doctorServices = inject(DoctorServices);
  private officeServices = inject(OfficeServices);
  private appointmentServices = inject(AppointmentServices);
  private alertsService = inject(AlertsService);

  patients = signal<IPatient[]>([]);
  doctors = signal<IDoctor[]>([]);
  offices = signal<IOffice[]>([]);
  appointments = signal<IAppointment[]>([]);
  loading = signal<boolean>(false);
  mode = signal<'list' | 'create'>('list');

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    // Para simplificar, cargamos todo secuencialmente o con forkJoin si fuera necesario
    // Aquí lo haremos por separado para manejar errores individualmente
    this.getPatients();
    this.getDoctors();
    this.getOffices();
    this.getAppointments();
  }

  getPatients() {
    this.patientServices.getPatients().subscribe({
      next: (res) => this.patients.set(res.data),
      error: (err) => this.alertsService.showErrorAlert('Error al cargar pacientes')
    });
  }

  getDoctors() {
    this.doctorServices.getDoctors().subscribe({
      next: (res) => this.doctors.set(res.data),
      error: (err) => this.alertsService.showErrorAlert('Error al cargar doctores')
    });
  }

  getOffices() {
    this.officeServices.getAllOffices().subscribe({
      next: (res) => this.offices.set(res.data),
      error: (err) => this.alertsService.showErrorAlert('Error al cargar oficinas')
    });
  }

  getAppointments() {
    this.appointmentServices.getAllAppointments().subscribe({
      next: (res) => {
        this.appointments.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.alertsService.showErrorAlert('Error al cargar citas');
        this.loading.set(false);
      }
    });
  }

  onCreateAppointment(appointment: IAppointment) {
    this.loading.set(true);
    this.appointmentServices.createAppointment(appointment).subscribe({
      next: (res) => {
        if (res.success) {
          this.alertsService.showSuccessAlert('Cita creada correctamente');
          this.getAppointments();
          this.mode.set('list');
        } else {
          this.alertsService.showErrorAlert('Error al crear cita: ' + res.errors.join(', '));
        }
      },
      error: (err) => this.alertsService.showErrorAlert('Error al crear cita'),
      complete: () => this.loading.set(false)
    });
  }

  onUpdateAppointment(appointment: IAppointment) {
    this.loading.set(true);
    this.appointmentServices.updateAppointment(appointment).subscribe({
      next: (res) => {
        if (res.success) {
          this.alertsService.showSuccessAlert('Cita actualizada correctamente');
          this.getAppointments();
        } else {
          this.alertsService.showErrorAlert('Error al actualizar cita: ' + res.errors.join(', '));
        }
      },
      error: (err) => this.alertsService.showErrorAlert('Error al actualizar cita'),
      complete: () => this.loading.set(false)
    });
  }

  onDeleteAppointment(id: string) {
    this.loading.set(true);
    this.appointmentServices.deleteAppointment(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.alertsService.showSuccessAlert('Cita eliminada correctamente');
          this.getAppointments();
        } else {
          this.alertsService.showErrorAlert('Error al eliminar cita: ' + res.errors.join(', '));
        }
      },
      error: (err) => this.alertsService.showErrorAlert('Error al eliminar cita'),
      complete: () => this.loading.set(false)
    });
  }

  changeMode(newMode: 'list' | 'create') {
    this.mode.set(newMode);
  }
}
