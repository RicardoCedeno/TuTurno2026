import { Component, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDoctorAvailability } from '../../../models/doctorAvailability';

@Component({
  selector: 'app-doctor-availability-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-availability-list.html',
  styleUrl: './doctor-availability-list.css'
})
export class DoctorAvailabilityList {
  @Input() slots: IDoctorAvailability[] = [];
  @Input() weekdays: any[] = [];
  deleteSlot = output<string>();

  getDayName(dayOfWeek: number): string {
    // API 0=Sunday, 1=Monday... 6=Saturday
    // JSON 1=Monday, 2=Tuesday... 7=Sunday
    const mappedId = dayOfWeek === 0 ? 7 : dayOfWeek;
    const day = this.weekdays.find(w => w.id === mappedId);
    return day ? day.name : 'Desconocido';
  }

  isWeekend(dayOfWeek: number): boolean {
    const mappedId = dayOfWeek === 0 ? 7 : dayOfWeek;
    const day = this.weekdays.find(w => w.id === mappedId);
    return day ? day.type === 'weekend' : false;
  }

  onDelete(id: string) {
    this.deleteSlot.emit(id);
  }
}
