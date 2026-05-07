import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientServices } from '../../services/patient-services';
import { DoctorServices } from '../../services/doctor-services';
import { IPatient } from '../../models/patient';
import { IDoctor } from '../../models/doctor';
import { AppointmentsCancellationList } from '../appointments-cancellation-list/appointments-cancellation-list';

@Component({
  selector: 'app-appointments-cancellation',
  standalone: true,
  imports: [CommonModule, FormsModule, AppointmentsCancellationList],
  templateUrl: './appointments-cancellation.html',
  styleUrl: './appointments-cancellation.css',
})
export class AppointmentsCancellation implements OnInit {
  private patientServices = inject(PatientServices);
  private doctorServices = inject(DoctorServices);

  patients = signal<IPatient[]>([]);
  doctors = signal<IDoctor[]>([]);

  selectedPatientId = '';
  selectedDoctorId = '';
  
  // Para disparar la búsqueda en el hijo
  searchTrigger = signal<{ patientId: string; doctorId: string } | null>(null);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.patientServices.getPatients().subscribe(res => {
      if (res.success) this.patients.set(res.data);
    });
    this.doctorServices.getDoctors().subscribe(res => {
      if (res.success) this.doctors.set(res.data);
    });
  }

  onConsult() {
    this.searchTrigger.set({
      patientId: this.selectedPatientId,
      doctorId: this.selectedDoctorId
    });
  }
}
