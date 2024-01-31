import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Classes/user';
import { LoginService } from 'src/app/services/login.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials={
    email:'',
    password:''
  }

  user: User;
constructor(
  private loginservice:LoginService,
  private toast: ToastrService,
  private  router: Router,
 private userDataService:UserDataService){
  
}

  ngOnInit(): void {
 
   
  }



  onSubmit(){
    if(this.credentials.email !='' && this.credentials.password !=''  ){
     
      this.loginservice.generateToken(this.credentials).subscribe(
       (response:any)=>{
        console.log(response) 
        this.userDataService.setUserDetails(response.user);
  console.log(response.jwtToken)
  console.log(response.user.roles)

  this.toast.success('Sign in successfully')
  
  // for profile name
  console.log(response.user.name)
  console.log(response.user.roles[0].roleName)
        const role = response.user.roles[0].roleName;
        this.loginservice.setUserRoles(role)
        const userName = response.user.name;
        this.loginservice.setUserName(userName)
        console.log(userName)
  
  this.loginservice.loginUser(response)
  this.router.navigate(['/dashboard']);
        console.log('hello')
        },error=>{
          this.toast.error('Sign in credential is incorrect')
          console.log(error);
        }
      )
     
     
      console.log('We have to submit form to console');
    }else{
      // this.router.navigate(['/register']);
      console.log('fields are empty');
      this.toast.warning("Sign in crediantial is mandatory.")
    }
  }
}