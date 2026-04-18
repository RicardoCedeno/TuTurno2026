import { CommonModule } from '@angular/common';
import { Component, Output, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ISpecialty } from '../../models/specialty';

@Component({
  selector: 'app-specialties-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './specialties-form.html',
  styleUrl: './specialties-form.css',
  standalone: true,
})
export class SpecialtiesForm {
  createSpecialty = output<ISpecialty>();
  cancel = output<string>();
  onSubmit(form: NgForm){
    if(form.valid){
      this.createSpecialty.emit(form.value);
    } else {
      console.log('Form is not valid');
      form.form.markAllAsTouched();
    }
  }

  onCancel(){
    this.cancel.emit('List');
  }
}
