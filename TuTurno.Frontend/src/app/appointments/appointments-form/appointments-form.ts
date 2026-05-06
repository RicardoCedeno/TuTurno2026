import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TutuCalendarComponent, CalendarEvent, CalendarEventCreate, CalendarEventUpdate } from '@tutu/calendar';
import { IPatient } from '../../models/patient';
import { IDoctor } from '../../models/doctor';
import { IOffice } from '../../models/office';
import { IAppointment } from '../../models/appointment';
import { AlertsService } from '../../services/alerts-service';
import { inject, computed } from '@angular/core';

@Component({
  selector: 'app-appointments-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TutuCalendarComponent],
  templateUrl: './appointments-form.html',
  styleUrl: './appointments-form.css'
})
export class AppointmentsForm {
  patients = input<IPatient[]>([]);
  doctors = input<IDoctor[]>([]);
  offices = input<IOffice[]>([]);
  appointments = input<IAppointment[]>([]);

  create = output<IAppointment>();
  update = output<IAppointment>();
  delete = output<string>();
  cancel = output<void>();

  private alertsService = inject(AlertsService);

  events = computed<CalendarEvent[]>(() => {
    return this.appointments().map(app => {
      const start = new Date(app.date);
      const end = new Date(start.getTime() + (app.duration || 30) * 60000);

      let color = '#3b82f6'; // Default blue
      if (app.status === 'completed') color = '#10b981'; // Green
      if (app.status === 'cancelled') color = '#ef4444'; // Red

      return {
        id: app.id,
        title: `Cita: ${app.patient?.name || 'Paciente'}`,
        start,
        end,
        color,
        status: app.status as any,
        draggable: true,
        resizable: true
      };
    });
  });

  showModal = signal(false);
  isEditMode = signal(false);
  pendingSlot = signal<CalendarEventCreate | null>(null);
  dateString = signal<string>('');

  formModel: Partial<IAppointment> = {
    patientId: '',
    doctorId: '',
    officeId: '',
    status: 'scheduled',
    notes: '',
    duration: 30
  };

  onEventCreate(slot: CalendarEventCreate) {
    this.isEditMode.set(false);
    this.pendingSlot.set(slot);
    this.formModel.date = slot.start;
    this.dateString.set(this.toDateTimeLocalString(slot.start));
    // Calcular duración en minutos
    const diffMs = slot.end.getTime() - slot.start.getTime();
    this.formModel.duration = Math.round(diffMs / 60000);
    this.showModal.set(true);
  }

  onEventClick(event: CalendarEvent) {
    const appointment = this.appointments().find(a => a.id === event.id);
    if (appointment) {
      this.isEditMode.set(true);
      this.formModel = { ...appointment };
      // Asegurarse de que la fecha sea un objeto Date
      const date = new Date(appointment.date);
      this.formModel.date = date;
      this.dateString.set(this.toDateTimeLocalString(date));
      this.showModal.set(true);
    }
  }

  async onEventDelete(event: CalendarEvent) {
    const result = await this.alertsService.showQuestionAlert('¿Deseas eliminar esta cita?');
    if (result.isConfirmed) {
      this.delete.emit(event.id);
    }
  }

  confirm() {
    if (this.formModel.patientId && this.formModel.doctorId && this.formModel.officeId) {
      this.formModel.date = new Date(this.dateString());
      
      if (this.isEditMode()) {
        this.update.emit(this.formModel as IAppointment);
      } else {
        const appointment: IAppointment = {
          id: '',
          ...this.formModel
        } as IAppointment;
        this.create.emit(appointment);
      }
      this.closeModal();
    }
  }

  closeModal() {
    this.showModal.set(false);
    this.pendingSlot.set(null);
    this.resetForm();
  }

  onCancel() {
    this.cancel.emit();
  }

  private resetForm() {
    this.formModel = {
      patientId: '',
      doctorId: '',
      officeId: '',
      status: 'scheduled',
      notes: '',
      duration: 30
    };
    this.dateString.set('');
  }

  private toDateTimeLocalString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
