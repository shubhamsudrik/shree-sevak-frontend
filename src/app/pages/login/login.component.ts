import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LocationDataService } from 'src/app/services/location-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private locationDataService: LocationDataService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Call decodedToken to get the decoded token value
    
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  proceedLogin() {

  //    if (this.loginForm.valid) {
  //     const loginData = {
  //       email: this.loginForm.get('email').value,
  //       password: this.loginForm.get('password').value
  //     };
  
  //     this.locationDataService.logIn(loginData).subscribe((
  //       ((res: any) => {
  //         localStorage.setItem('access_token',res.token);
  //         this.
  //         console.log("res: " + res.message);
  //         this.loginForm.reset();
  //         this.locationDataService.storeToken(res.token);
  //         this.toast.success({ detail: 'SUCCESS', summary: res.message, duration: 500 });
  
  //     } ) 
  }
}  