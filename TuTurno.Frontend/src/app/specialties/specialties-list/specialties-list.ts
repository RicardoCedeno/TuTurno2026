import { Component, inject, Input, output, Output } from '@angular/core';
import { ISpecialty } from '../../models/specialty';

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

  deleteSpecialty(id: string){
    this.delete.emit(id);
  }
}
