import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleBaithak } from '../Classes/people-baithak';

@Injectable({
  providedIn: 'root'
})
export class PepoleBaithakService {
private baseUrl='http://localhost:8080/api/baithak2'
  constructor(
    private httpClient:HttpClient
  ) { }

    saveBaithakDetails(baithak:any):Observable<Object>{
      return this.httpClient.post(`${this.baseUrl}/createbaithak2/gents_ladies`,baithak)

    }

    getBaithakListBaseOnLocation(locationId:any):Observable<PeopleBaithak[]>{
      return this.httpClient.get<PeopleBaithak[]>(`${this.baseUrl}/baseOnLocation/${locationId}`)
    }

    updateBaithakDetails(baithak:any,baithakId:any):Observable<object>{
      return this.httpClient.put(`${this.baseUrl}/update-baithak2/${baithakId}`,baithak)
    }

    // For Get the active record from database
    getActiveBaithakListBaseOnLocation(locationId:any): Observable<PeopleBaithak[]> {
    return this.httpClient.get<PeopleBaithak[]>(`${this.baseUrl}/status/1/${locationId}`);
  }
 
}