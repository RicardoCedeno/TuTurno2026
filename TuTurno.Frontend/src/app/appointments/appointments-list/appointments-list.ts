import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutuCalendarComponent, CalendarEvent } from '@tutu/calendar';
import { IAppointment } from '../../models/appointment';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [CommonModule, TutuCalendarComponent],
  templateUrl: './appointments-list.html',
  styleUrl: './appointments-list.css'
})
export class AppointmentsList {
  appointments = input<IAppointment[]>([]);

  events = computed<CalendarEvent[]>(() => {
    return this.appointments().map(app => {
      const start = new Date(app.date);
      const end = new Date(start.getTime() + (app.duration || 30) * 60000);
      
      let color = '#3b82f6'; // Default blue
      if (app.status === 'completed') color = '#10b981'; // Green
      if (app.status === 'cancelled') color = '#ef4444'; // Red

      return {
        id: app.id,
        title: `Cita: ${app.patient?.name || 'Paciente'} con Dr. ${app.doctor?.name || 'Médico'}`,
        start,
        end,
        color,
        status: app.status as any,
        draggable: false,
        resizable: false
      };
    });
  });
}
