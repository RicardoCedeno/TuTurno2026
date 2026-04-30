import { Component, inject, Input, output, Output } from '@angular/core';
import { ISpecialty } from '../../models/specialty';
import { DataServices } from '../../services/data-services';

@Component({
  selector: 'app-specialties-list',
  imports: [],
  templateUrl: './specialties-list.html',
  styleUrl: './specialties-list.css',
  standalone: true,
})
export class SpecialtiesList {
  @Input() specialties: ISpecialty[] | null = null;
  delete = output<string>();
  updateSpecialty = output<ISpecialty>();
  private dataServices = inject(DataServices<ISpecialty>);

  deleteSpecialty(id: string){
    this.delete.emit(id);
  }
  onUpdate(specialty: ISpecialty){
    this.dataServices.setSelectedItem(specialty);
    this.updateSpecialty.emit(specialty);
  }
}
