import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../Classes/schedule';
import { ScheduleDto } from '../Classes/schedule-dto';
import { DateLocation } from '../Classes/DateLocation';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDataService {

  constructor( private httpclient: HttpClient) { }


 private baseUrl = "http://localhost:8080/api/schedular";
 private url = "http://localhost:8080/api";



  // For Get the all schedule record from database 
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
 setAllData(schedule:Schedule):Observable<Object>{
    return this.httpclient.post(`${this.baseUrl}/createbaithak`,schedule);

  }

  //update the excisting record
  updateBaithak(scheduleId:number,schedule:Schedule,):Observable<Object>{
    return this.httpclient.put(`${this.baseUrl}/update-baithak/${scheduleId}`,schedule)
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

 getscheduleByDateAndLocationBaithak(date:string,LocationId:number,BaithakId:number):Observable<Object>{

  return this.httpclient.get<DateLocation>(`${this.baseUrl}/getByDateLocationBaithak/${date}/${LocationId}/${BaithakId}`)

}
getScheduleByMonthAndYear(month:string,year:string):Observable<Object>{
  return  this.httpclient.get<Schedule[]>(`${this.baseUrl}/getByMonthAndYear/${month}/${year}`)
}
}
