import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";
import { NgToastService } from "ng-angular-popup";
import { UserDataService } from "../services/user-data.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toast: NgToastService,
    private userDataService: UserDataService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.loginService.isLoggedIn()) {
      console.log("auth guard   " + this.loginService.isLoggedIn());
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
