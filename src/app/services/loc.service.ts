import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocService {

  constructor(private httpclient: HttpClient) {
  }    

 
  private baseUrl = "http://localhost:8080";
  

  // For Get the active record from database
  getLocationList(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/location/status/1`);
  }

    // For Get all location
    getAllLocationList(): Observable<Location[]> {
      return this.httpclient.get<Location[]>(`${this.baseUrl}/api/location/`);
    }
    
  // get active and Inactive by status
  getLocationByStatus(statustype: string): Observable<Location[]>{
    return this.httpclient.get<Location[]>(`${this.baseUrl}/api/location/status/${statustype}`);
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
  updateLocation(location: Location,locationId: number): Observable<Object>{
    return this.httpclient.put(`${this.baseUrl}/api/location/${locationId}`, location);
  }

  // For delete the record from database
  deleteLocation(id: number): Observable<Object>{
    return this.httpclient.delete(`${this.baseUrl}/api/location/${id}`);
  }
  getLocationByAreaId(areaId: any): Observable<Object>{
    return this.httpclient.get<Location[]>(`${this.baseUrl}/api/location/allLocations/areaId/${areaId}`)
  }

  getPaginateLocationList(pageNumber: number,pageSize: number){
    return this.httpclient.get<Location[]>(`${this.baseUrl}/api/location/pagination/all?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
     
  getPaginateLocationListBaseOnStatus(pageNumber: number,pageSize: number,statustype:string){
    return this.httpclient.get<Location[]>(`${this.baseUrl}/api/location/status/pagination/${statustype}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
     
  getPaginateLocationListBaseOnSearch(keyword:string,status:string,pageNumber: number,pageSize: number){
    return this.httpclient.get<Location[]>(`${this.baseUrl}/api/location/search?keyword=${keyword}&status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
     
}

