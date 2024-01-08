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
 getAreaByStatus(status: string):Observable<Area[]>{ {
  return this.httpClient.get<Area[]>(`${this.baseUrl}/statusType/${status}`);
}
}

getAllAreaList() {
  return this.httpClient.get<Area[]>(`${this.baseUrl}/all-areas`);
}

getAllUnselectedAreas(){
  return this.httpClient.get<Area[]>(`${this.baseUrl}/unselected-Areas`);
}
getAllUnselectedAreasExceptSingleUser(userId:number):Observable<Area[]>{
  return this.httpClient.get<Area[]>(`${this.baseUrl}/unselected-AreasforUser/${userId}`);
}

getAreaById(id: number):Observable<Area>{ 
  return this.httpClient.get<Area>(`${this.baseUrl}/${id}`);


}

updateArea(area:Area,id: number):Observable<Area>{
  return this.httpClient.put<Area>(`${this.baseUrl}/update-area/${id}`,area);
}


findAreaByName(areaName: any):Observable<Area>{ 
  console.log(areaName ,"inside find by name api");
 return this.httpClient.get<Area>(`${this.baseUrl}/areaName?areaName=${areaName}`);

}


}
