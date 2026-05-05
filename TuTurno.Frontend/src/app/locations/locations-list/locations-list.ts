import { Component, inject, Input, output } from '@angular/core';
import { ILocation } from '../../models/location';
import { DataServices } from '../../services/data-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [],
  templateUrl: './locations-list.html',
  styleUrl: './locations-list.css',
})
export class LocationsList {
  @Input() locations: ILocation[] | null = null;
  delete = output<string>();
  updateLocation = output<ILocation>();
  private dataServices = inject(DataServices<ILocation>);

  deleteLocation(id: string){
    this.delete.emit(id);
  }
  
  onUpdate(location: ILocation){
    this.dataServices.setSelectedItem(location);
    this.updateLocation.emit(location);
  }
}
