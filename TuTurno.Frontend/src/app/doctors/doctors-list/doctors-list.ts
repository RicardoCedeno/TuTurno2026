import { Component, inject, Input, output } from '@angular/core';
import { IDoctor } from '../../models/doctor';
import { DataServices } from '../../services/data-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors-list',
  imports: [CommonModule],
  templateUrl: './doctors-list.html',
  styleUrl: './doctors-list.css',
  standalone: true,
})
export class DoctorsList {
  @Input() doctors: IDoctor[] | null = null;
  delete = output<string>();
  updateDoctor = output<IDoctor>();
  private dataServices = inject(DataServices<IDoctor>);

  deleteDoctor(id: string){
    this.delete.emit(id);
  }
  
  onUpdate(doctor: IDoctor){
    this.dataServices.setSelectedItem(doctor);
    this.updateDoctor.emit(doctor);
  }
}
