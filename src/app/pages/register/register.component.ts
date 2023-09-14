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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private locationDataService: LocationDataService
  ) {}

  
  ngOnInit() {
    console.log('ngOnInit called');
    this.registerform = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      photoUrl: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern(
          //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
          // )
        ]
      ],
      emailId: ['', [Validators.required, Validators.email]]
    });
  }

  proceedregisteration() {
    console.log(this.registerform.value);
    if (this.registerform.valid) {
      this.locationDataService.signUP(this.registerform.value).subscribe(
        (res) => {
          this.toast.success('Register Successfully');
          console.log('Response:', res);
          console.log(this.registerform.value);
         
          this.router.navigate(['/login']);
        }, 
        (error) => {

          console.error('Error:', error);
          this.toast.error('Error occurred while registering');
        }
      );
    } else {
      
      console.log("not working")
      this.toast.warning('Please enter valid data');
    
    }}

}
