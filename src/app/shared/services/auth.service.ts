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
    return this._HttpClient.post(`https://my-json-server.typicode.com/Gamgom29/Final-QuizWebsite/students` , userData);
  }
  getUsers(type:string):Observable<any>{
    return this._HttpClient.get(`https://my-json-server.typicode.com/Gamgom29/Final-QuizWebsite/${type}`);
  }
  login(userData:object):Observable<any>{
    return this._HttpClient.put(`https://my-json-server.typicode.com/Gamgom29/Final-QuizWebsite/login/1` , userData);
  }
  getUser(id:string):Observable<any>{
    return this._HttpClient.get(`https://my-json-server.typicode.com/Gamgom29/Final-QuizWebsite/students/${id}`);
  }
  updateUser(id:string , model:object):Observable<any>{
    return this._HttpClient.put(`https://my-json-server.typicode.com/Gamgom29/Final-QuizWebsite/students/${id}` , model);
  }
  getRole():Observable<any>{
    return this._HttpClient.get(`https://my-json-server.typicode.com/Gamgom29/Final-QuizWebsite/login/1`);
  }
}
