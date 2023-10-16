import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationDataService {
 
  private baseUrl = "http://localhost:8080";
  

  constructor(private httpclient: HttpClient) {
  
  }


  //signup

  
  signUP(signup: any): Observable<object> {
    return this.httpclient.post(`${this.baseUrl}/api/user/signup`, signup);
  }
}

