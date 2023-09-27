import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  url = `http://localhost:8080`;
  constructor(private http:HttpClient) {}


//calling server to generate token
generateToken(credentials:any){
  //token generate 


  return this.http.post(`${this.url}/auth/login`,credentials);


}


  loginUser(token) {
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

  //to check that user is logout in or not 
  logOut(){
  localStorage.removeItem("token");
  return true;
  }

  //to get the token 

  getToken(){
    console.log(localStorage.getItem("token"))
    return localStorage.getItem("token")
  }
}
