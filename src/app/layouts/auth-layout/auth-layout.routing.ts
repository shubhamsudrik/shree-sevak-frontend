import { Routes } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { OtpComponentComponent } from 'src/app/pages/forgot-password/otp-component/otp-component.component';
import { ChangePasswordComponent } from 'src/app/pages/forgot-password/change-password/change-password.component';


export const AuthLayoutRoutes: Routes = [
    
    { path: 'login',          component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'otp-component', component: OtpComponentComponent },
    { path: 'change-password', component: ChangePasswordComponent}
    
];
