import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoginService implements OnInit {
  url = `http://localhost:8080`;
  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    // this.autoLogout();
  }

  

//calling server to generate token
generateToken(credentials:any){
  //token generate 


  return this.http.post(`${this.url}/auth/login`,credentials);


}


  loginUser(token:string) {
    localStorage.setItem("token",token);
    console.log(token);
    return true;
  }
//to check that user is logged in or not 


  isLoggedIn() {
    let token = localStorage.getItem("token");
    
    if (token == undefined || token == "" || token == null) {
      return false;
    } else {
      return true;
    }
  }

  //for user logout 
  logoutUser(){
  localStorage.removeItem("token");
  return true;
  }
  // auto logout
   myTimeout = setTimeout(this.autoLogout, 7.2e+6);
  //automatically & through signout logout
  autoLogout(){
    localStorage.removeItem("token")
    return true;
  }

  //to get the token 

  getToken(){
    console.log(localStorage.getItem("token"))
    return localStorage.getItem("token")
  }
}
