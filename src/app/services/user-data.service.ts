import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor( private httpclient: HttpClient) { }



  private url = "http://localhost:8080/api/user";

  getUserByUsername(username: string):Observable<Object> {
    return this.httpclient.get(`${this.url}/username/${username}`)
  }
 
 


}
