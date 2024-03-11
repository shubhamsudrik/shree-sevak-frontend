import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaysService {
  constructor(private httpclient: HttpClient) {
  }    

 
  private baseUrl = "http://localhost:8080";
  

  // For Get the active record from database
  getWeekDays(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/week/all`);
  }
}
