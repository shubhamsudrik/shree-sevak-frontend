import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from '../Classes/Area';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaDataService {
 



  private baseUrl="http://localhost:8080/api/area"
  constructor(private httpClient:HttpClient) { }

 createArea(area:any):Observable<Object>{
return this.httpClient.post(`${this.baseUrl}/create`,area);
 }

 getAreaByStatus(status: string):Observable<Area[]>{ 
  return this.httpClient.get<Area[]>(`${this.baseUrl}/statusType/${status}`);
}

//get paginated area by status
  getPaginateAreaBaseOnStatus(pageNumber: number,pageSize: number,statustype:string){
    return this.httpClient.get<any[]>(`${this.baseUrl}/statusType/pagination/${statustype}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

getAllAreaList() {
  return this.httpClient.get<Area[]>(`${this.baseUrl}/all-areas`);
}
// For Get the all record from database by pagination
getAllAreaListByPagination(pageNumber: number, pageSize: number): Observable<any[]> {
  return this.httpClient.get<any[]>(`${this.baseUrl}/pagination/all-areas?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

getAllUnselectedAreas(){
  return this.httpClient.get<Area[]>(`${this.baseUrl}/unselected-Areas`);
}
getAllUnselectedAreasExceptSingleUser(userId:number):Observable<Area[]>{
  return this.httpClient.get<Area[]>(`${this.baseUrl}/unselected-AreasforUser/${userId}`);
}

getAreaById(id: any):Observable<Area>{ 
  return this.httpClient.get<Area>(`${this.baseUrl}/${id}`);


}

updateArea(area:Area,id: number):Observable<Area>{
  return this.httpClient.put<Area>(`${this.baseUrl}/update-area/${id}`,area);
}


findAreaByName(areaName: any):Observable<Area>{ 
  console.log(areaName ,"inside find by name api");
 return this.httpClient.get<Area>(`${this.baseUrl}/areaName?areaName=${areaName}`);

}

//get by search
getPaginateAreaListBaseOnSearch(keyword:string,status:string,pageNumber: number,pageSize: number){
  return this.httpClient.get<any[]>(`${this.baseUrl}/filter/search?keyword=${keyword}&status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
}

}
