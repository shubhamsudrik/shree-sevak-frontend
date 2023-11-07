export interface ApiResponse {
  success: boolean;
  message: string;
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocationDataService } from 'src/app/services/location-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerform: FormGroup;
  submitted = false;

  constructor(
    private router: Router,      
    private fb: FormBuilder,
    private toast: ToastrService,
    private locationDataService: LocationDataService,
  ) {}

  ngOnInit() {
    this.registerform = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      photoUrl: [''],
      emailId: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
        ]
      ],
      role: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      status:[],
    });
  }

  get registerFormControl() {
    return this.registerform.controls;
  }
  proceedregistration() {
    this.submitted=true;
    if (this.registerform.valid) {
      if (this.registerform.get('password').value !== this.registerform.get('confirmPassword').value) {
        this.registerform.get('confirmPassword').setErrors({ passwordsDoNotMatch: true });
        this.toast.error('Passwords do not match');
        console.log("password not match")
      } else {
        this.locationDataService.signUP(this.registerform.value).subscribe(
          (res:ApiResponse) => {
  
            if (res.success === false) {
              this.toast.warning('User Is Already Exit With Same Email,Mobile');
              console.log('Response:', res);
            } else {
            this.toast.success('Register Successfully');
            console.log('Response:', res);
            this.router.navigate(['/login']);
            }
          },
          (error) => {
            console.error('Error:', error);
            this.toast.error('Error occurred while registering');
          }
        );
      }
    } else {
      this.toast.warning('All field is mandatory.');
    }
  }

  validatePhoneNumber(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 10); // Truncate input to 10 characters
    input.value = truncatedValue;
  }
}
