import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  //muestra un alerta de tipo success usando sweetalert2
  showSuccessAlert(message: string) {
    Swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
    });
  }
  showErrorAlert(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
    });
  }
  showWarningAlert(message: string) {
    Swal.fire({
      title: 'Warning',
      text: message,
      icon: 'warning',
    });
  }
  showInfoAlert(message: string) {
    Swal.fire({
      title: 'Info',
      text: message,
      icon: 'info',
    });
  }
  showConfirmAlert(message: string) {
    Swal.fire({
      title: 'Confirm',
      text: message,
      icon: 'question',
    });
  }
  showQuestionAlert(message: string) {
    Swal.fire({
      title: 'Question',
      text: message,
      icon: 'question',
    });
  }
}
