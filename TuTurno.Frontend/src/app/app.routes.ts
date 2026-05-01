import { Routes } from '@angular/router';
import {Specialties} from './specialties/specialties/specialties';
import { Doctors } from './doctors/doctors/doctors';
import { Login } from './login/login/login';
import { Patients } from './patients/patients/patients';

export const routes: Routes = [
  { path: 'specialties', component: Specialties },
  { path: 'doctors', component: Doctors },
  {path: 'login', component: Login},
  {path: 'patients', component: Patients},
];