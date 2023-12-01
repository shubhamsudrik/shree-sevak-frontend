import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocationDataService } from 'src/app/services/location-data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent  {
 
    forgotPasswordForm: FormGroup;
    submitted = false;
    Loading =false;
  
    constructor(
      private formBuilder: FormBuilder,
      private router : Router,   
      private toast : ToastrService  ,
      private locationDataService: LocationDataService,
      ){

      this.forgotPasswordForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]]       
      });
    }
  
    get forgotPassword() {
      return this.forgotPasswordForm.controls;
    }
  
    onSubmit() {
      this.submitted = true;
    
      if (this.forgotPasswordForm.valid) {
        this.Loading = true;

        const email = this.forgotPasswordForm.value.email;
        console.log('Email:', email);
    
        this.locationDataService.forgotPassword(email).subscribe(
          (response: any) => {
            this.Loading =false;
            console.log(response);
            if(response==="mailNotExist"){
              this.toast.error('Email does not exist');
              this.forgotPasswordForm.reset();
            }else{
              this.toast.success('OTP sent successfully');
              this.router.navigate(['/otp-component']);
 }
            // Navigate or perform other actions based on success
          },
          (error) => {
            this.toast.error('OTP send failed');
            console.error(error);
            this.Loading =false;
          }
        );
      } 
    };
    backToLogin(){
      this.router.navigate(['/login']);
    }
  }
  