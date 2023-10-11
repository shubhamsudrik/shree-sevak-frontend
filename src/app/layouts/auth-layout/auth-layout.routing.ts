import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
// import { EditLocationComponent } from 'src/app/pages/edit-location/edit-location.component';




export const AuthLayoutRoutes: Routes = [
    
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    // {path : 'edit-location',    component:EditLocationComponent},
 
    
];
