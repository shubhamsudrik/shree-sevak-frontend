import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, catchError, throwError } from 'rxjs';
import { Country } from '../Classes/Country';


@Injectable({
  providedIn: 'root'
})
export class LocationDataService {
 
  private baseUrl = "http://localhost:8080";
  private locationUrl="http://localhost:8080/api/country"
  

  constructor(private httpclient: HttpClient) {
  
  }


  //signup

  
  signUP(signup: any): Observable<object> {
    return this.httpclient.post(`${this.baseUrl}/api/user/signup`, signup);
  }

   //Forgot password  
  //  forgotPassword(forgotPassword: any): Observable<object> {

  //   return this.httpclient.post(`${this.baseUrl}/auth/forgot`, forgotPassword);
  // }
  forgotPassword(email: string): Observable<string> {
    const params = new HttpParams().set('email', email);
    return this.httpclient.post(`${this.baseUrl}/api/user/forgot`, {}, { params, responseType: 'text' });
  }

  verifyOtp(otp: any): Observable<string> {
    const params = new HttpParams().set('otp', otp);
    return this.httpclient.post(`${this.baseUrl}/api/user/verify-otp`, {}, { params, responseType: 'text' });
  }

  changePassword(confirmPassword: any): Observable<string> {
    const params = new HttpParams().set('confirmPassword', confirmPassword);

    return this.httpclient.post(`${this.baseUrl}/api/user/change-password`, {}, { params, responseType: 'text' })
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          return throwError('Error occurred during password change'); // You can customize the error message
        })
      );}

  // verifyOtp(otp: any): Observable<any> {
  //   const data = { otp: otp };
  //   return this.httpclient.post(`${this.baseUrl}/api/user/verify-otp`, data);
  // }

  getAllCountryList(): Observable<Country[]>{
    return this.httpclient.get<Country[]>(`${this.locationUrl}/all`);

  }
  




}

