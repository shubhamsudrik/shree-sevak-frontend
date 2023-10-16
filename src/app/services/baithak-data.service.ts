import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

import { Baithak } from '../Classes/baithak';
@Injectable({
  providedIn: 'root'
})
export class BaithakDataService {
 
  private baseUrl = "http://localhost:8080/api/baithak";
  

  constructor(private httpclient: HttpClient) {
  //  this.userPayLoad = this.decodedToken();
  }

    // For Get the active record from database
    getBaithakList(): Observable<Baithak[]> {
      return this.httpclient.get<Baithak[]>(`${this.baseUrl}/all-baithak`);
    }

      // For Get the record by id wise from database
  getBaithakById(baithakId: number): Observable<Baithak>{
    return this.httpclient.get<Baithak>(`${this.baseUrl}/${baithakId}`);
   }
      // For Get the record by active status wise from database
  getBaithakByStatus(statustype: string): Observable<Baithak[]>{
    return this.httpclient.get<Baithak[]>(`${this.baseUrl}/status/${statustype}`);
   }



    createBaithak(baithak:Baithak):Observable<Object>{
      return this.httpclient.post(`${this.baseUrl}/createbaithak`,baithak);

    }
    updateBaithak(baithakId:number,baithak:Baithak,):Observable<Object>{
      return this.httpclient.put(`${this.baseUrl}/update-baithak/${baithakId}`,baithak)
    }

}

