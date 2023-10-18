

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent  {
 
    forgotPasswordForm: FormGroup;
  
    constructor(private formBuilder: FormBuilder) {
      this.forgotPasswordForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]]
      });
    }
  
    get f() {
      return this.forgotPasswordForm.controls;
    }
  
    onSubmit() {
      if (this.forgotPasswordForm.valid) {
        const email = this.forgotPasswordForm.value.email;
        // Send an HTTP request to your backend to handle the password reset request.
        // Here, we're simulating the request.
        console.log('Sending reset password request for email:', email);
        // You can handle the request and response accordingly.
      }
    }
  }
  