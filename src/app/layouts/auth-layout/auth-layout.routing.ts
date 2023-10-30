import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { HasRoleGuard } from 'src/app/guard/has-role.guard';


export const AuthLayoutRoutes: Routes = [
    
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
  
 
    
];
