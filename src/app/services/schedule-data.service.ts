import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../Classes/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDataService {

  constructor( private httpclient: HttpClient) { }


 private baseUrl = "http://localhost:8080/api/baithak";
 private url = "http://localhost:8080/api";

  //for get schedular
  getSchedul(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.url}/schedular/all-schedules`);
  }

  // For Get the all record from database
  getAllData(): Observable<Schedule[]> {
    return this.httpclient.get<Schedule[]>(`${this.baseUrl}/all-baithak`);
  }

    // For Get the record by id wise from database
    getScheduleById(baithakId: number): Observable<Schedule>{
  return this.httpclient.get<Schedule>(`${this.baseUrl}/${baithakId}`);
 }
    // For Get the record by active status wise from database
getScheduleByStatus(statustype: string): Observable<Schedule[]>{
  return this.httpclient.get<Schedule[]>(`${this.baseUrl}/status/${statustype}`);
 }

  // For Get the active record from database
  getActiveScheduleRecord(): Observable<Schedule[]> {
    return this.httpclient.get<Schedule[]>(`${this.baseUrl}/status/1`);
  }

// create new record
 setAllData(schedule:Schedule):Observable<Object>{
    return this.httpclient.post(`${this.baseUrl}/createbaithak`,schedule);

  }

  //update the excisting record
  updateBaithak(scheduleId:number,schedule:Schedule,):Observable<Object>{
    return this.httpclient.put(`${this.baseUrl}/update-baithak/${scheduleId}`,schedule)
  }

}
