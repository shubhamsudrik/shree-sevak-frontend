import { Injectable } from '@angular/core';
import {  CanActivate, Router, } from '@angular/router';
import { LocationDataService } from '../services/location-data.service';
import { NgToastService } from 'ng-angular-popup';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


constructor( private locationDataService: LocationDataService,
   private router: Router,
   private toast: NgToastService){

}

  canActivate(): boolean{

   if(this.locationDataService.isLoggedIn){
           return true;
   }else{
    this.toast.error({detail:"ERROR", summary:"Please Login First"})
    this.router.navigate(['/login']);
          return false;
   }
  }
  
}
