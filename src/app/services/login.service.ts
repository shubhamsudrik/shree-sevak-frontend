import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { User } from "../Classes/user";

@Injectable({
  providedIn: "root",
})
export class LoginService implements OnInit {
  url = `http://localhost:8080`;
  constructor(private http:HttpClient,
    private loginService:LoginService
    ) {}

 userDetail:User
  ngOnInit(): void {
    // this.autoLogout();
  
  }

  private userName: string;
  private userNameKey = 'user_name';
  private UserRole : string;
  private roleKey='role'
  
  setUserName(name: string): void {
    this.userName = name;
    localStorage.setItem(this.userNameKey, name);
  }
  setUserRoles(role: string): void {
    this.UserRole = role;
    localStorage.setItem(this.roleKey, role);
  }

  getUserName(): string {
    // Check localStorage first
    const storedUserName = localStorage.getItem(this.userNameKey);
    // If not in localStorage, use the in-memory value
    return storedUserName || this.userName;
  }
  getUserRole(): string {
    const storedUserRole = localStorage.getItem(this.roleKey);
    return storedUserRole || this.userName;
  }


//calling server to generate token
generateToken(credentials:any){
  //token generate 


  return this.http.post(`${this.url}/auth/login`,credentials);


}


  loginUser(response:any) {
    console.log(response);
    localStorage.setItem("token",response.jwtToken);
    this.setRoles(response.user.roles);

    return true;
  }
//to check that user is logged in or not 


  isLoggedIn() {
    let token = localStorage.getItem("token");
    
    if (token == undefined || token == "" || token == null  && this.getRoles()) {
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

  //to get the token 

  getToken(){
    console.log(localStorage.getItem("token"))
    return localStorage.getItem("token")
  }

  /**
   * This methos set the string format jwt token in local storage
   * @param roles 
   */
  public setRoles(roles:[]){
    localStorage.setItem("roles", JSON.stringify(roles));



  }

  /**
   * This methos is used to retunr the string token int o JSON format
   * @returns roles 
   */
  public getRoles():[]{
  return JSON.parse(localStorage.getItem("roles"));

  }
}
