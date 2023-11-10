import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../Classes/user";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  constructor(
    private httpclient: HttpClient,
    private loginservice: LoginService
  ) {}

  private url = "http://localhost:8080/api/user";

  getUserByUsername(username: string): Observable<Object> {
    return this.httpclient.get(`${this.url}/username/${username}`);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.loginservice.getRoles();
    // console.log(userRoles);
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName == allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
