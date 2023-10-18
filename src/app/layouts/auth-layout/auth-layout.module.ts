import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { LocationDataService } from 'src/app/services/location-data.service';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    // NgbModule
  ],
  providers: [LocationDataService],
  
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ]
})
export class AuthLayoutModule { }
