import { Injectable } from '@angular/core';
import {  CanActivate, Router, } from '@angular/router';
import { LocationDataService } from '../services/location-data.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


constructor( private locationDataService: LocationDataService,
   private router: Router,
  ){

}

  canActivate(): boolean{

   if(this.locationDataService.isLoggedIn){
           return true;
   }else{
   
    this.router.navigate(['/login']);
          return false;
   }
  }
  
}
