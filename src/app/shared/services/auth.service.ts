import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }
  createUser(userData:object):Observable<any>{
    return this._HttpClient.post(`http://localhost:3000/students` , userData);
  }
  getUsers(type:string):Observable<any>{
    return this._HttpClient.get(`http://localhost:3000/${type}`);
  }
  login(userData:object):Observable<any>{
    return this._HttpClient.put(`http://localhost:3000/login/1` , userData);
  }
  getRole():Observable<any>{
    return this._HttpClient.get(`http://localhost:3000/login/1`);
  }
}
