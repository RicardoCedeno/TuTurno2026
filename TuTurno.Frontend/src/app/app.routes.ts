import { Routes } from '@angular/router';
import { Specialties } from './specialties/specialties/specialties';
import { Doctors } from './doctors/doctors/doctors';
import { Login } from './login/login/login';
import { Patients } from './patients/patients/patients';
import { Offices } from './offices/offices/offices';
import { Locations } from './locations/locations/locations';
import { Appointments } from './appointments/appointments/appointments';
import { AppointmentsCancellation } from './appointments-cancellation/appointments-cancellation/appointments-cancellation';
import { DoctorAvailability } from './doctors/doctor-availability/doctor-availability/doctor-availability';
import { Home } from './home/home/home';

export const routes: Routes = [
  // Redirects
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Main routes
  { path: 'home', component: Home },
  { path: 'specialties', component: Specialties },
  { path: 'doctors', component: Doctors },
  { path: 'doctor-availability', component: DoctorAvailability },
  { path: 'login', component: Login },
  { path: 'patients', component: Patients },
  { path: 'offices', component: Offices },
  { path: 'locations', component: Locations },
  { path: 'appointments', component: Appointments },
  { path: 'cancellations', component: AppointmentsCancellation },

  // Wildcard route
  { path: '**', redirectTo: 'home' }
];
