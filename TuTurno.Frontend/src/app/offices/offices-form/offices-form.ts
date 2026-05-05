import { Component, inject, signal, OnInit, output, input, effect } from '@angular/core';
import { IOffice } from '../../models/office';
import { ILocation } from '../../models/location';

import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertsService } from '../../services/alerts-service';
import { DataServices } from '../../services/data-services';

@Component({
  selector: 'app-offices-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './offices-form.html',
  styleUrl: './offices-form.css',
})
export class OfficesForm implements OnInit {
  createOffice = output<IOffice>();
  updateOffice = output<IOffice>();
  cancel = output<'list' | 'create' | 'update'>();
  mode = input<'create' | 'update' | 'list' | null>(null);
  locations = input<ILocation[]>([]);
  
  formValues: Partial<IOffice> = {
    id: '',
    locationId: '',
    name: '',
    floor: '',
    description: '',
    active: true
  };
  
  buttonLabel: string = '';
  
  private alertsService = inject(AlertsService);
  private dataServices = inject(DataServices<IOffice>);

  constructor() {
    effect(() => {
      const currentMode = this.mode();
      const selected = this.dataServices.selectedItem();
      
      if (currentMode === 'update' && selected) {
        this.formValues = { ...selected };
        this.buttonLabel = 'Actualizar';
      } else if (currentMode === 'create') {
        this.resetForm();
        this.buttonLabel = 'Agregar';
      }
    });
  }

  ngOnInit() {}

  resetForm() {
    this.formValues = {
      id: '',
      locationId: '',
      name: '',
      floor: '',
      description: '',
      active: true
    };
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.mode() === 'create') {
        this.createOffice.emit(this.formValues as IOffice);
      } else if (this.mode() === 'update') {
        const office = this.dataServices.getSelectedItem();
        if (office) {
          const updatedOffice = { ...office, ...this.formValues };
          this.updateOffice.emit(updatedOffice as IOffice);
        } else {
          this.alertsService.showWarningAlert('No hay una oficina seleccionada');
        }
      }
    }
  }

  onCancel() {
    this.cancel.emit('list');
  }
}
