import { Routes } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';


export const AuthLayoutRoutes: Routes = [
    
    { path: 'login',          component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
  
 
    
];
