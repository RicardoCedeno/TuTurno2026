import { Component, Input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IDoctorAvailability } from '../../../models/doctorAvailability';
import { IDoctor } from '../../../models/doctor';

interface DaySelection {
  dayId: number;
  dayName: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
  isWeekend: boolean;
}

@Component({
  selector: 'app-doctor-availability-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-availability-form.html',
  styleUrl: './doctor-availability-form.css'
})
export class DoctorAvailabilityForm implements OnInit {
  @Input() doctors: IDoctor[] = [];
  @Input() weekdays: any[] = [];
  @Input() initialDoctorId: string = '';
  
  save = output<IDoctorAvailability[]>();
  cancel = output<void>();

  daySelections: DaySelection[] = [];

  ngOnInit() {
    this.initDaySelections();
  }

  initDaySelections() {
    // Ordenamos los días para que empiecen por Lunes (ID 1) y terminen en Domingo (ID 7)
    const sortedDays = [...this.weekdays].sort((a, b) => a.id - b.id);
    
    this.daySelections = sortedDays.map(day => ({
      dayId: day.id,
      dayName: day.name,
      enabled: false,
      startTime: '08:00',
      endTime: '17:00',
      isWeekend: day.type === 'weekend'
    }));
  }

  onSubmit() {
    const enabledSlots = this.daySelections
      .filter(d => d.enabled)
      .map(d => ({
        doctorId: this.initialDoctorId,
        dayOfWeek: d.dayId === 7 ? 0 : d.dayId, // Mapeo de JSON ID a API dayOfWeek
        startTime: d.startTime,
        endTime: d.endTime
      } as IDoctorAvailability));

    if (enabledSlots.length === 0) {
      alert('Seleccione al menos un día');
      return;
    }

    this.save.emit(enabledSlots);
  }

  onCancel() {
    this.cancel.emit();
  }

  toggleDay(day: DaySelection) {
    day.enabled = !day.enabled;
  }
}
