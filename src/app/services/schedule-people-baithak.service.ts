import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleBaithak } from 'src/app/Classes/people-baithak';
import { PeopleSchedule } from '../Classes/people-schedule';


@Injectable({
  providedIn: 'root'
})
export class SchedulePeopleBaithakService {
 
  private baseUrl = "http://localhost:8080/api/people";
  public serviceDefaultMember: any[] = [];
  public scheduleMember: any[] = [];
  //public serviceSelectedMember: any[] = [];
  totalMembers: number;
  constructor(private httpclient: HttpClient) {
  }

  createPeolpeSchedule(peopleSchedule: PeopleSchedule[]): Observable<any> {

    return this.httpclient.post<any>('http://localhost:8080/api/people/createschedule', peopleSchedule);
  }

  // For Get all AllpeopleScheduleList
  getAllpeopleScheduleList(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/allschedules`);
  }

 getIndividulaScheduleByDateAndBaithakId(date:any,baithakId:any): Observable<any> {
  return this.httpclient.get<any[]>(`${this.baseUrl}/getByDateLocationBaithak/${date}/${baithakId}`);
}




  getMembers(baithakId: any): any[] {
    console.log( this.serviceDefaultMember)
    console.log("baithak id ",baithakId)
     const newServiceDefaultMember = this.serviceDefaultMember.filter(
       (member) => {
         // Check if member's date and baithakId match the provided parameters
         return  member.baithak === +baithakId;
       }
     );
 
     console.log(
       "fillter members base on baithak memebers",
       newServiceDefaultMember
     );
     const scheduleMember = this.scheduleMember.filter(
       (member) =>  member.baithak === +baithakId
     );
     console.log("schedule member",scheduleMember)
     console.log("selected member",this.scheduleMember)

     const memberIdsToRemove = scheduleMember.map(
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
   setMembers(members: any[]) {
    this.serviceDefaultMember = [...members];
    console.log("list of members", this.serviceDefaultMember);
  }

  addMemeberToSchedule(memberDetail: any) {
    const index = this.scheduleMember.findIndex(
      (member) =>
        // member.memberId === memberDetail.memberId &&
        member.baithak === +memberDetail.baithak
    );
    if (index !== -1) {
      //update member if found
      try {
        if (
          this.scheduleMember[index].memberId !== 0 &&
          memberDetail.memberId !== 0
        ) {
          console.log(
            "List of serviceDefaultMemebr: ",
            this.serviceDefaultMember
          );
          this.scheduleMember[index] = memberDetail;
        }
      } catch (err) {
        console.log(err);
      }
    } else if (!isNaN(+memberDetail.memberId) && memberDetail.memberId !== 0) {
      //Add a new Meber if not found
      this.scheduleMember.push(memberDetail);
    }

    console.log("Array of scheduleMemebr", this.scheduleMember);
  }
  setSingleScheduleMember(member: any) {
    const foundIndex=this.scheduleMember.findIndex((value)=>{
      return (
     
        value.baithak === +member.baithak 
     
      );
    })
    console.log("found", foundIndex)
    if(foundIndex !== -1) {
      this.scheduleMember[foundIndex]=member
      console.log("list of members", this.scheduleMember);
    }else{
      this.scheduleMember.push(member);
      console.log("list of members", this.scheduleMember);
    }
      
  } 
}