import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { UpdateScheduleComponent } from 'src/app/pages/schedular/update-schedule/update-schedule.component';
// import { EditLocationComponent } from 'src/app/pages/edit-location/edit-location.component';




export const AuthLayoutRoutes: Routes = [
    
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'update-schedule',       component: UpdateScheduleComponent },
    // {path : 'edit-location',    component:EditLocationComponent},
 
    
];
