// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
// import { NgToastService } from 'ng-angular-popup';
// import { LocationDataService } from 'src/app/location-data.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {

//   loginForm : FormGroup;
//   type: string ='password';
//   isText: boolean = false;
//   eyeIcon : string = 'fa-eye-slash';


//   constructor( private locationDataService: LocationDataService, 
//     private router: Router,
//     public translate: TranslateService,
//     private fb:FormBuilder,
//     private toast: NgToastService,
//      ) {}


//      ngOnInit() {
//       this. loginForm = this.fb.group({
//         emailId: ['',Validators.required],
//         password: ['',Validators.required]
//         });
//      }

//      hideShowPass(){
//       this.isText =!this.isText
//       this.isText ? (this.eyeIcon = 'fa-eye' ) : (this.eyeIcon = 'fa-eye-slash');
//       this.isText ? (this.type = 'text' ) : (this.type = 'password');
//      }

//      login: { email: string, password: string } = { email: '', password: '' };
     
//   proceedlogin(){
//     console.log(this.loginForm.value);
//     this.locationDataService.logIn(this.loginForm)
    
//     if(this.loginForm.valid){
//       console.log(this.loginForm.value);
//       this.locationDataService.logIn(this.loginForm.value).subscribe ({
//         next:(res) => {
//           console.log(res.message);
//           this.loginForm.reset();
//           this.locationDataService.storeToken(res.token);
//           this.toast.success({detail : "success", summary:res.message,duration: 500});
//         },

//         error:(err) => {
//           alert(err?.error.message +"Somthing when wrong" )
//           this.toast.error({detail : "error", summary: "Somthing when wrong" , duration: 500});
//         },
//       })
//     }else{
//         // ValidateForm.validateAllFormFields(this.loginForm);
//     }
//   }
// }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgToastService } from 'ng-angular-popup';
import { LocationDataService } from 'src/app/location-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor( private locationDataService: LocationDataService, 
    private router: Router,
    public translate: TranslateService,
    private fb:FormBuilder,
    private toast: NgToastService,
     ) {}


     ngOnInit() {
    
     }
     
  proceedlogin(){
    console.log(this.loginForm.value);
    this.locationDataService.logIn(this.loginForm)
  }
}
