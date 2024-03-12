import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PepoleBaithakService {
 
 private baseUrl=`http://localhost:8080/api/baithak2`
  constructor(
    private httpClient:HttpClient
  ) { }

    saveBaithakDetails(baithak:any):Observable<Object>{
      return this.httpClient.post(`${this.baseUrl}/createbaithak2/gents_ladies`,baithak)

    }
 
}
