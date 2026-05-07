import { Component, inject, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentServices } from '../../services/appointment-services';
import { AppointmentCancellationServices } from '../../services/appointment-cancellation-services';
import { AlertsService } from '../../services/alerts-service';
import { IAppointment } from '../../models/appointment';
import { IAppointmentCancellation } from '../../models/appointmentCancellation';
import { IPatient } from '../../models/patient';
import { IDoctor } from '../../models/doctor';

@Component({
  selector: 'app-appointments-cancellation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments-cancellation-list.html',
  styleUrl: './appointments-cancellation-list.css',
})
export class AppointmentsCancellationList implements OnChanges {
  @Input() patientId: string = '';
  @Input() doctorId: string = '';
  @Input() patients: IPatient[] = [];
  @Input() doctors: IDoctor[] = [];

  private appointmentServices = inject(AppointmentServices);
  private cancellationServices = inject(AppointmentCancellationServices);
  private alertsService = inject(AlertsService);

  activeTab = signal<'scheduled' | 'cancelled'>('scheduled');

  scheduledAppointments = signal<IAppointment[]>([]);
  cancellations = signal<IAppointmentCancellation[]>([]);

  loading = signal(false);

  // Modal State
  showModal = signal(false);
  selectedAppointment = signal<IAppointment | null>(null);
  cancellationReason = '';
  cancelledBy = 'admin';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['patientId'] || changes['doctorId']) {
      this.loadData();
    }
  }

  loadData() {
    this.loading.set(true);

    // Obtener citas programadas
    this.appointmentServices.getAppointmentsByPatientDoctorAndStatus(this.patientId, this.doctorId, 'scheduled')
      .subscribe(res => {
        if (res.success) this.scheduledAppointments.set(res.data);
      });

    // Obtener historial de cancelaciones
    // Si hay paciente, priorizamos búsqueda por paciente
    if (this.patientId) {
      this.cancellationServices.getCancellationsByPatient(this.patientId).subscribe(res => {
        if (res.success) this.cancellations.set(res.data);
        this.loading.set(false);
      });
    } else if (this.doctorId) {
      this.cancellationServices.getCancellationsByDoctor(this.doctorId).subscribe(res => {
        if (res.success) this.cancellations.set(res.data);
        this.loading.set(false);
      });
    } else {
      this.cancellationServices.getAllCancellations().subscribe(res => {
        if (res.success) this.cancellations.set(res.data);
        this.loading.set(false);
      });
    }
  }

  openCancelModal(appointment: IAppointment) {
    this.selectedAppointment.set(appointment);
    this.cancellationReason = '';
    this.showModal.set(true);
  }

  async confirmCancellation() {
    if (!this.cancellationReason.trim()) {
      this.alertsService.showWarningAlert('El motivo de cancelación es obligatorio.');
      return;
    }

    const cancellation: Partial<IAppointmentCancellation> = {
      appointmentId: this.selectedAppointment()?.id,
      reason: this.cancellationReason,
      cancelledBy: this.cancelledBy
    };

    this.cancellationServices.createCancellation(cancellation).subscribe(async res => {
      if (res.success) {
        this.showModal.set(false);
        this.alertsService.showSuccessAlert('La cita ha sido cancelada exitosamente.');
        this.loadData(); // Refrescar tablas automáticamente
      } else {
        this.alertsService.showErrorAlert('No se pudo cancelar la cita: ' + res.errors.join(', '));
      }
    });
  }

  closeModal() {
    this.showModal.set(false);
  }

  getPatientName(id: string): string {
    return this.patients.find(p => p.id === id)?.name || 'N/A';
  }

  getDoctorName(id: string): string {
    return this.doctors.find(d => d.id === id)?.name || 'N/A';
  }
}
