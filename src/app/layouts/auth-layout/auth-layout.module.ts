import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/user-list/register/register.component';
import { LocationDataService } from 'src/app/services/location-data.service';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ButtonModule } from 'primeng/button';
@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
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
