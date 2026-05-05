import { Component, inject, Input, output } from '@angular/core';
import { IOffice } from '../../models/office';
import { DataServices } from '../../services/data-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offices-list',
  imports: [CommonModule],
  templateUrl: './offices-list.html',
  styleUrl: './offices-list.css',
  standalone: true,
})
export class OfficesList {
  @Input() offices: IOffice[] | null = null;
  delete = output<string>();
  updateOffice = output<IOffice>();
  private dataServices = inject(DataServices<IOffice>);

  deleteOffice(id: string){
    this.delete.emit(id);
  }
  
  onUpdate(office: IOffice){
    this.dataServices.setSelectedItem(office);
    this.updateOffice.emit(office);
  }
}
