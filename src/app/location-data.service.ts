import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from './location';
import { EditLocationComponent } from './pages/edit-location/edit-location.component';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class LocationDataService {
 
  private baseUrl = "http://localhost:8080";
  

  constructor(private httpclient: HttpClient) {
   this.userPayLoad = this.decodedToken();
  }

  // For Get the active record from database
  getLocationList(): Observable<Location[]> {
    return this.httpclient.get<Location[]>(`${this.baseUrl}/api/location/active/1`);
  }

  // for create the record in the database
  createLocation(location: Location): Observable<Object>{
    return this.httpclient.post(`${this.baseUrl}/api/location/`, location);
  }

  // For Get the record by id wise from database
  getLocationById(locationId: number): Observable<Location>{
   return this.httpclient.get<Location>(`${this.baseUrl}/api/location/${locationId}`);
  }


  // For update the record into database
  updateLocation(locationId: number, location: Location): Observable<Object>{
    return this.httpclient.put(`${this.baseUrl}/api/location/${locationId}`, location);
  }

  // For delete the record from database
  deleteLocation(id: number): Observable<Object>{
    return this.httpclient.delete(`${this.baseUrl}/api/location/${id}`);
  }



  // auth guard

  private userPayLoad: any;
  //login
  logIn(login: any): Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/auth/login`, login);
  }
  //signup
  signUP(signup: any): Observable<object> {
    return this.httpclient.post(`${this.baseUrl}/api/user/signup`, signup);
  }

  //store token
  storeToken(tokenValue: string){
    // return this.httpclient.get<Location>(`${this.baseUrl}/api/location/${token}`);
    localStorage.setItem('token', tokenValue);
   }

  //gettoken
  getToken(){
    return localStorage.getItem('token');
   }

   isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper =new JwtHelperService();
    const token =this.getToken();
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getfullNameFromToken(){
    
  }
}

