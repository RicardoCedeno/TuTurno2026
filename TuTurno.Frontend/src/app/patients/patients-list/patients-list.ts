import { Component, inject, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPatient } from '../../models/patient';
import { DataServices } from '../../services/data-services';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patients-list.html',
  styleUrl: './patients-list.css',
})
export class PatientsList {
  @Input() patients: IPatient[] | null = null;
  delete = output<string>();
  updatePatient = output<IPatient>();
  private dataServices = inject(DataServices<IPatient>);

  deletePatient(id: string) {
    this.delete.emit(id);
  }

  onEdit(patient: IPatient) {
    this.dataServices.setSelectedItem(patient);
    this.updatePatient.emit(patient);
  }
}
