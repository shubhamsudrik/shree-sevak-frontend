import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { NgToastService } from 'ng-angular-popup';
import { UserDataService } from '../services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toast: NgToastService,
    private userDataService: UserDataService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
         
   if(this.loginService.isLoggedIn() !=null){
    const role=route.data["roles"] as Array<string>;
   if(role){
    const match=this.userDataService.roleMatch(role)
    if(match){
      console.log("auth guard   "+this.loginService.isLoggedIn())
      return true
   

    }else{
      alert("not a admin")
      return false;
    }

    }
   

   }
  }
  
}
