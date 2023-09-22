import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../Classes/member';

@Injectable({
  providedIn: 'root'
})
export class MemberListService {

  private baseUrl = "http://localhost:8080";
  
  constructor(private httpclient: HttpClient) {
  //  this.userPayLoad = this.decodedToken();
  }


  // For Get the all record from database
  getAllMemberList(): Observable<Member[]> {
    return this.httpclient.get<Member[]>(`${this.baseUrl}/api/member/all-members`);
  }

  
  //get member by status
  getMemberByStatus(member: string): Observable<Member[]>{
    return this.httpclient.get<Member[]>(`${this.baseUrl}/api/member/status/${member}`);

  }

  // For Get the active record from database
  getMemberList(): Observable<Member[]> {
    return this.httpclient.get<Member[]>(`${this.baseUrl}/api/member/status/1`);
  }

  // for create the record in the database
  createMember(member: Member): Observable<Object>{
    return this.httpclient.post(`${this.baseUrl}/api/member/createmember`, member);
  }



  // For Get the record by id wise from database
  getMemberById(memberId: number): Observable<Member>{
   return this.httpclient.get<Member>(`${this.baseUrl}/api/member/${memberId}`);
  }

  updateMember(memberId: number, member: Member): Observable<Object>{
    return this.httpclient.put(`${this.baseUrl}/api/member/${memberId}`, member);
  }
}
