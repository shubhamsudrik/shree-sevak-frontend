import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleBaithak } from 'src/app/Classes/people-baithak';


@Injectable({
  providedIn: 'root'
})
export class SchedulePeopleBaithakService {
 
  private baseUrl = "http://localhost:8080/api/people";
  public serviceDefaultMember: any[] = [];
  public schduleVachanmember: any[] = [];
  

  constructor(private httpclient: HttpClient) {
  }

  createPeolpeSchedule(peopleBaithak: PeopleBaithak): Observable<any> {
    const dataToSend = [peopleBaithak];
    return this.httpclient.post<any>('http://localhost:8080/api/people/createschedule', dataToSend);
  }

  // For Get all AllpeopleScheduleList
  getAllpeopleScheduleList(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/allschedules`);
  }

  getMembers(date: string, baithakId: any, locationId: any): any[] {
    console.log( this.serviceDefaultMember)
     const newServiceDefaultMember = this.serviceDefaultMember.filter(
       (member) => {
         // Check if member's date and baithakId match the provided parameters
         return member.date === date && member.baithakId === +baithakId;
       }
     );
 
     console.log(
       "fillter members base on date memebers",
       newServiceDefaultMember
     );
     const vachanMember = this.schduleVachanmember.filter(
       (member) => member.date === date && member.baithakId === +baithakId
     );
     console.log("vachan member",vachanMember)
     console.log("selected vachan",this.schduleVachanmember)

     const memberIdsToRemove = vachanMember.map(
       (member) => member.memberId
     );
 
     const sortedMemeberList = newServiceDefaultMember.filter(
       (member) => !memberIdsToRemove.includes(member.memberId)
     );
     // const nonSelectHajeriMembers=updatedServiceDefaultMember.filter()
     console.log(sortedMemeberList);
     this.serviceDefaultMember=[]
     return sortedMemeberList;
   }
}

