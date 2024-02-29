import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, firstValueFrom, lastValueFrom } from "rxjs";
import { Schedule } from "../Classes/schedule";
import { ScheduleDto } from "../Classes/schedule-dto";
import { DateLocation } from "../Classes/DateLocation";
import { Member } from "../Classes/member";
import { MemberListService } from "./member-list.service";
import { LocationDataService } from "./location-data.service";
import { LocService } from "./loc.service";

@Injectable({
  providedIn: "root",
})
export class ScheduleDataService {
  public schduleVachanmember: any[] = [];
  public schduleHajeriMember: any[] = [];
  public serviceDefaultMember: any[] = [];
  public serviceSelectedMember: any[] = [];
  totalMembers: number;

  constructor(
    private httpclient: HttpClient,
    private memberService: MemberListService,
  private locationService:LocService
  ) {}

  private baseUrl = "http://localhost:8080/api/schedular";
  //  private url = "http://localhost:8080/api";

  // For Get the all schedule record from database
  getAllData(): Observable<Schedule[]> {
    return this.httpclient.get<Schedule[]>(`${this.baseUrl}/all-schedules`);
  }

  // For Get the record by id wise from database
  getScheduleById(baithakId: number): Observable<Schedule> {
    return this.httpclient.get<Schedule>(`${this.baseUrl}/${baithakId}`);
  }
  // For Get the record by active status wise from database
  getScheduleByStatus(statustype: string): Observable<Schedule[]> {
    return this.httpclient.get<Schedule[]>(
      `${this.baseUrl}/status/${statustype}`
    );
  }

  // For Get the active record from database
  getActiveScheduleRecord(): Observable<Schedule[]> {
    return this.httpclient.get<Schedule[]>(`${this.baseUrl}/status/1`);
  }

  // create new record
  setAllData(schedule: Schedule): Observable<Object> {
    return this.httpclient.post(`${this.baseUrl}/createbaithak`, schedule);
  }

  //update the excisting record
  updateBaithak(scheduleId: number, schedule: Schedule): Observable<Object> {
    return this.httpclient.put(
      `${this.baseUrl}/update-baithak/${scheduleId}`,
      schedule
    );
  }

  getRecordByPagination(keyword: string,pageNumber:number,pageSize:number): Observable<Schedule[]> {
    return this.httpclient.get<Schedule[]>(
      `${this.baseUrl}/filter/search?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getAllrecordOnPagination(pageNumber:number,pageSize:number){
    return this.httpclient.get<Schedule[]>(
      `${this.baseUrl}/pagination/all-schedules?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }


  // create new record
  createScheduleRecord(schedulesarray: ScheduleDto[]): Observable<Object> {
    console.log("Inside service");
    console.log(schedulesarray);
    return this.httpclient.post(
      `${this.baseUrl}/create-schedule`,
      schedulesarray
    );
  }

  //update the excisting record
  updateSchedule(schduleArray: ScheduleDto[]): Observable<Object> {
    return this.httpclient.put(`${this.baseUrl}/update-schedule`, schduleArray);
  }

  getscheduleByDateAndLocationBaithak(
    date: string,
    LocationId: number,
    BaithakId: number
  ): Observable<Object> {
    return this.httpclient.get<DateLocation>(
      `${this.baseUrl}/getByDateLocationBaithak/${date}/${LocationId}/${BaithakId}`
    );
  }
  getScheduleByMonthAndYearAndBaithak(
    month: string,
    year: string,
    BaithakId: number
  ): Observable<Object> {
    return this.httpclient.get<Schedule[]>(
      `${this.baseUrl}/getByMonthAndYearAndBaithak/${month}/${year}/${BaithakId}`
    );
  }

  addMembersToSchduleHajeriGhenara(memberDetail: any) {
    // Check if the member already exists in the array
    const index = this.schduleHajeriMember.findIndex(
      (member) =>
        // member.memberId === memberDetail.memberId &&
        member.locationId === +memberDetail.locationId &&
        member.date === memberDetail.date &&
        member.baithakId === +memberDetail.baithakId
    );

    if (index !== -1) {
      //update member if found
      try {
        if (
          this.schduleHajeriMember[index].memberId !== 0 &&
          memberDetail.memberId !== 0
        ) {
          console.log(
            "List of serviceDefaultMemebr: ",
            this.serviceDefaultMember
          );
          this.schduleHajeriMember[index] = memberDetail;
        }
      } catch (err) {
        console.log(err);
      }
    } else if (!isNaN(+memberDetail.memberId) && memberDetail.memberId !== 0) {
      //Add a new Meber if not found
      this.schduleHajeriMember.push(memberDetail);
    }

    // const selectedHajeriMembers = this.schduleHajeriMember;
    // const hajeriMemberIdsToRemove = selectedHajeriMembers.map(
    //   (member) => member.memberId
    // );

    // const updatedMembers = this.serviceDefaultMember.filter(
    //   (member) => !hajeriMemberIdsToRemove.includes(member.memberId)
    // );
    // this.setMembers(updatedMembers);
    console.log("Array of HAJERIMEMBERS", this.schduleHajeriMember);
  }

  addMembersToSchduleVachanGhenara(memberDetail: any) {
    const index = this.schduleVachanmember.findIndex(
      (member) =>
        // member.memberId === memberDetail.memberId &&
        member.locationId === +memberDetail.locationId &&
        member.date === memberDetail.date &&
        member.baithakId === +memberDetail.baithakId
    );

    if (index !== -1) {
      // Update the existing member if found
      try {
        if (
          this.schduleVachanmember[index].memberId !== 0 &&
          memberDetail.memberId !== 0
        ) {
          console.log(
            "List of serviceDefaultMemebr: ",
            this.serviceDefaultMember
          );
          this.schduleVachanmember[index] = memberDetail;
        }
      } catch (err) {
        console.error(err);
      }
    } else if (!isNaN(+memberDetail.memberId) && memberDetail.memberId !== 0) {
      // Add a new member if not found
      this.schduleVachanmember.push(memberDetail);
    }

    // const selectedVachanMembers = this.schduleVachanmember;
    // const vachanMemberIdsToRemove = selectedVachanMembers.map(
    //   (member) => member.memberId
    // );

    // const updatedMember = this.serviceDefaultMember.filter(
    //   (member) => !vachanMemberIdsToRemove.includes(member.memberId)
    // );
    // this.setMembers(updatedMember);

    console.log("Array of VACHANMEMBERS", this.schduleVachanmember);
  }

  // validateHajerimember(member: any) {
  //   const index1 = this.schduleHajeriMember.findIndex((value) => {
  //     return (
  //       value.memberId === +member.memberId &&
  //       value.date === member.date &&
  //       value.baithakId === +member.baithakId
  //     );
  //   });
  //   console.log("for hajeri", index1);
  //   if (index1 === -1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  validateMember(member: any) {
    const index1 = this.schduleHajeriMember.findIndex((value) => {
      return (
        value.memberId === +member.memberId &&
        value.date === member.date &&
        value.baithakId === +member.baithakId
      );
    });
    const index2 = this.schduleVachanmember.findIndex((value) => {
      return (
        value.memberId === +member.memberId &&
        value.date === member.date &&
        value.baithakId === +member.baithakId
      );
    });
    console.log("for hajeri", index1);
    console.log("for vachan", index1);
    if (index1 === -1 && index2 === -1) {
      return true;
    } else {
      return false;
    }
  }


  // validateVachanMember(member: any) {
  //   const index1 = this.schduleVachanmember.findIndex((value) => {
  //     return (
  //       value.memberId === +member.memberId &&
  //       value.date === member.date &&
  //       value.baithakId === +member.baithakId
  //     );
  //   });
  //   console.log("for vachan", index1);
  //   if (index1 === -1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  setMembersLength(length: number) {
    this.totalMembers = length;
  }
  getMembersLength() {
    return this.totalMembers;
  }
  setMembers(members: any[]) {
    this.serviceDefaultMember = [...members];
    console.log("list of members", this.serviceDefaultMember);
  }
  setSingleVachanMembers(member: any) {
    const foundIndex=this.schduleVachanmember.findIndex((value)=>{
      return (
        value.date === member.date &&
        value.baithakId === +member.baithakId &&
        value.locationId === +member.locationId
      );
    })
    console.log("found", foundIndex)
    if(foundIndex !== -1) {
      this.schduleVachanmember[foundIndex]=member
      console.log("list of members", this.schduleVachanmember);
    }else{
      this.schduleVachanmember.push(member);
      console.log("list of members", this.schduleVachanmember);
    }
      
  
  }
  setSingleHajeriMembers(member: any) {
    const foundIndex=this.schduleHajeriMember.findIndex((value)=>{
      return (
        value.date === member.date &&
        value.baithakId === +member.baithakId &&
        value.locationId === +member.locationId
        );
      })
      console.log("found", foundIndex)

if(foundIndex !== -1) {
  this.schduleHajeriMember[foundIndex]=member
  console.log("list of members scheduleHajeri", this.schduleHajeriMember);
}else{
  this.schduleHajeriMember.push(member)
  console.log("list of members scheduleHajeri", this.schduleHajeriMember);
}
  
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
    // const updatedServiceDefaultMember = newServiceDefaultMember.slice(
    //   0,
    //   this.getMembersLength()
    // );
    const hajeriMember = this.schduleHajeriMember.filter(
      (member) => member.date === date && member.baithakId === +baithakId
    );

    console.log("hajerimember",hajeriMember)
    console.log("selected hajerimember",this.schduleHajeriMember)
    const vachanMember = this.schduleVachanmember.filter(
      (member) => member.date === date && member.baithakId === +baithakId
    );
    console.log("vachan member",vachanMember)
    console.log("selected vachan",this.schduleVachanmember)
    const listOfhajeriAndVachanMember = [...vachanMember, ...hajeriMember];
    const newlistOfhajeriAndVachanMember=listOfhajeriAndVachanMember.filter(
      (member) => {
        // Check if member's date and baithakId match the provided parameters
        return member.date === date && member.baithakId === +baithakId;
      })
    const memberIdsToRemove = newlistOfhajeriAndVachanMember.map(
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

  //  newServiceDefaultMember.filter((member) =>{
  //   if(member.date === date && member.baithakId ===baithakId && member.locationId === locationId){

  //     return member;
  //   }
  // });
}
