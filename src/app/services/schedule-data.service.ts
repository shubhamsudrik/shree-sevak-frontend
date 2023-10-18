import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../Classes/schedule';
import { ScheduleDto } from '../Classes/ScheduleDto';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDataService {

  constructor( private httpclient: HttpClient) { }


 private baseUrl = "http://localhost:8080/api/schedular";


  // For Get the all record from database
  getAllData(): Observable<Schedule[]> {
    return this.httpclient.get<Schedule[]>(`${this.baseUrl}/all-schedules`);
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
 createScheduleRecord(schedulesarray:ScheduleDto[]):Observable<Object>{

  console.log("Inside service")
  console.log(schedulesarray)
    return this.httpclient.post(`${this.baseUrl}/create-schedule`,schedulesarray);
    

  }

  //update the excisting record
  updateSchedule(schduleArray:ScheduleDto[]):Observable<Object>{
    return this.httpclient.put(`${this.baseUrl}/update-schedule`,schduleArray)
  }

  
   


}
