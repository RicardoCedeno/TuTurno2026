import { Routes } from '@angular/router';
import {Specialties} from './specialties/specialties/specialties';
import { Doctors } from './doctors/doctors/doctors';
import { Login } from './login/login/login';

export const routes: Routes = [
  { path: 'specialties', component: Specialties },
  { path: 'doctors', component: Doctors },
  {path: 'login', component: Login},
];