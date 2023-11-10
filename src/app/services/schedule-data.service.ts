import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, firstValueFrom, lastValueFrom } from "rxjs";
import { Schedule } from "../Classes/schedule";
import { ScheduleDto } from "../Classes/schedule-dto";
import { DateLocation } from "../Classes/DateLocation";
import { Member } from "../Classes/member";
import { MemberListService } from "./member-list.service";

@Injectable({
  providedIn: "root",
})
export class ScheduleDataService {
  public schduleVachanmember: any[] = [];
  public schduleHajeriMember: any[] = [];
  public serviceDefaultMember: any[] = [];

  constructor(private httpclient: HttpClient,private memberService:MemberListService) {}

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

  async addMembersToSchduleHajeriGhenara(memberDetail: any) {
  
    // Check if the member already exists in the array
    const index = this.schduleHajeriMember.findIndex(
      (member) =>
        // member.memberId === memberDetail.memberId &&
        member.locationId === memberDetail.locationId &&
        member.date === memberDetail.date &&
        member.baithakId === memberDetail.baithakId
    );

    if (index !== -1) {
      //update member if found
      try{
        if( this.schduleHajeriMember[index].memberId !==0  && memberDetail.memberId !==0){
          const member:Member=await lastValueFrom(this.memberService.getMemberById(this.schduleHajeriMember[index].memberId))
          this.serviceDefaultMember.push(member);
          this.schduleHajeriMember[index] = memberDetail;
        }
       
      }catch(err) {
        console.log(err);
      }
      
      
    } else if (!isNaN(+memberDetail.memberId) && memberDetail.memberId !==0) {
      //Add a new Meber if not found
      this.schduleHajeriMember.push(memberDetail);
    }

    const selectedHajeriMembers = this.schduleHajeriMember;
    const hajeriMemberIdsToRemove = selectedHajeriMembers.map(
      (member) => member.memberId
    );

    const updatedMembers = this.serviceDefaultMember.filter(
      (member) => !hajeriMemberIdsToRemove.includes(member.memberId)
    );
    this.setMembers(updatedMembers);
    console.log("Array of HAJERIMEMBERS", this.schduleHajeriMember);
  }

  async addMembersToSchduleVachanGhenara(memberDetail: any) {
    const index = this.schduleVachanmember.findIndex(
      (member) =>
        // member.memberId === memberDetail.memberId &&
        member.locationId === memberDetail.locationId &&
        member.date === memberDetail.date &&
        member.baithakId === memberDetail.baithakId
    );

    if (index !== -1) {

      // Update the existing member if found
     try{
      if(this.schduleVachanmember[index].memberId !==0 && memberDetail.memberId !==0){
        const member:Member=await lastValueFrom(this.memberService.getMemberById( this.schduleVachanmember[index] .memberId))
        this.serviceDefaultMember.push(member);
  
        this.schduleVachanmember[index] = memberDetail;
      }
     

     }catch(err) {
      console.error(err);
     }

      
    } else if (!isNaN(+memberDetail.memberId) && memberDetail.memberId !==0) {
      // Add a new member if not found
      this.schduleVachanmember.push(memberDetail);
    }

     const selectedVachanMembers = this.schduleVachanmember;
      const vachanMemberIdsToRemove = selectedVachanMembers.map((member) => member.memberId);
      
     const updatedMember= this.serviceDefaultMember.filter((member) => !vachanMemberIdsToRemove.includes(member.memberId));
      this.setMembers(updatedMember);

    console.log("Array of VACHANMEMBERS", this.schduleVachanmember);
  }

  validateHajerimember(member: any) {
    const index1 = this.schduleHajeriMember.findIndex((value) => {
      return value.memberId === member.memberId && value.date === member.date;
    });
    console.log("for hajeri", index1);
    if (index1 === -1) {
      return true;
    } else {
      return false;
    }
  }

  validateVachanMember(member: any) {
    const index1 = this.schduleVachanmember.findIndex((value) => {
      return value.memberId === member.memberId && value.date === member.date;
    });
    console.log("for vachan", index1);
    if (index1 === -1) {
      return true;
    } else {
      return false;
    }
  }
  setMembers(members: Member[]) {
    this.serviceDefaultMember = members;
    console.log(this.serviceDefaultMember);
  }

  getMembers(){
    return this.serviceDefaultMember
  }
}
