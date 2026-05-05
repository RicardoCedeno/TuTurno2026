import { Routes } from '@angular/router';
import {Specialties} from './specialties/specialties/specialties';
import { Doctors } from './doctors/doctors/doctors';
import { Login } from './login/login/login';
import { Patients } from './patients/patients/patients';
import { Offices } from './offices/offices/offices';
import { Locations } from './locations/locations/locations';



export const routes: Routes = [
  { path: 'specialties', component: Specialties },
  { path: 'doctors', component: Doctors },
  {path: 'login', component: Login},
  {path: 'patients', component: Patients},
  { path: 'offices', component: Offices },
  { path: 'locations', component: Locations },
];