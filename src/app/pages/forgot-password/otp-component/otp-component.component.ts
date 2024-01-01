import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LocationDataService } from 'src/app/services/location-data.service';

@Component({
  selector: 'app-otp-component',
  templateUrl: './otp-component.component.html',
  styleUrls: ['./otp-component.component.css']
})
export class OtpComponentComponent  {

   
      otpForm: FormGroup;
      submitted = false;
    
      constructor(
        private formBuilder: FormBuilder,
        private router : Router,   
        private toast : ToastrService  ,
        private locationDataService: LocationDataService,
        ){
  
        this.otpForm = this.formBuilder.group({
          otp: ['', [Validators.required]]       
        });
      }
    
      get otp() {
        return this.otpForm.controls;
      }

      onSubmit() {
        this.submitted = true;
      
        if (this.otpForm.valid) {
          const otp = this.otpForm.value.otp;
          console.log('OTP:', otp);
      
          this.locationDataService.verifyOtp(otp).subscribe(
            (response: any) => {
              console.log("response", response);

              if(response === "password_change_form"){
                this.toast.success('OTP verify successfully');
                console.log('Navigating to /register');
                 this.router.navigate(['/change-password']);
              }else{
                this.toast.error('Invalid OTP');
                // this.otpForm.reset();
              }



              // this.router.navigate(['/otp-component']);
              // Navigate or perform other actions based on success
            },
            (error) => {
              this.toast.error('Invalid OTP');            
              console.log(error);
              this.otpForm.reset();
            }
          );

        } 
      };
      
      validatePincode(event) {
        const input = event.target;
        const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        const truncatedValue = numericValue.slice(0, 6); // Truncate input to 6 characters
        input.value = truncatedValue;
    }
 }