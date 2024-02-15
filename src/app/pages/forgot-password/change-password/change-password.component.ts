import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LocationDataService } from 'src/app/services/location-data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

   
      changePasswordForm: FormGroup;
      submitted = false;
      Loading =false;
    
      constructor(
        private formBuilder: FormBuilder,
        private router : Router,   
        private toast : ToastrService  ,
        private locationDataService: LocationDataService,
        ){
  
        this.changePasswordForm = this.formBuilder.group({
          password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)]]  ,
          confirmPassword: ['', [Validators.required]]       
        });
      }
    
      get changePassword() {
        return this.changePasswordForm.controls;
      }
    
      onSubmit() {
        this.submitted = true;
        this.Loading =true;
          if (this.changePasswordForm.valid) {
            if (this.changePasswordForm.get('password').value !== this.changePasswordForm.get('confirmPassword').value) {
              this.changePasswordForm.get('confirmPassword').setErrors({ passwordsDoNotMatch: true });
              this.toast.error('Passwords do not match');
              console.log("password not match")
            } else{
            const confirmPassword = this.changePasswordForm.value.confirmPassword;
            console.log('confirmPassword:', confirmPassword);

          this.locationDataService.changePassword(confirmPassword).subscribe(
            (response: any) => {
              console.log("response", response);
              this.Loading=false;
              if(response === "password_change_accepted" || response === "password Successfully changed"){
                this.toast.success('Password Changed successfully');
                // console.log('Navigating to /register');
                 this.router.navigate(['/login']);
              }else{
                this.toast.error('Password Change Failed');
              }
            
              // this.router.navigate(['/otp-component']);
              // Navigate or perform other actions based on success
            },
            (error) => {
              this.toast.error('Password Not Accepted');
              console.error(error);
            }
          );
          }
        } 
    };
     
 }
