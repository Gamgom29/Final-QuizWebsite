import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _HttpClient:HttpClient) { }
  createExam(model:object):Observable<any>{
    return this._HttpClient.post('https://my-json-server.typicode.com/Gamgom29/Final-QuizWebsite/subjects',model);
  }
  getExams():Observable<any>{
    return this._HttpClient.get('https://my-json-server.typicode.com/Gamgom29/Final-QuizWebsite/subjects');
  }
  updateExam(model:object,id:string):Observable<any>{
    return this._HttpClient.put(`https://my-json-server.typicode.com/Gamgom29/Final-QuizWebsite/subjects/${id}`,model);
  }
  deleteExam(id:string):Observable<any>{
    return this._HttpClient.delete(`https://my-json-server.typicode.com/Gamgom29/Final-QuizWebsite/subjects/${id}`);
  }
  getExam(id:string):Observable<any>{
    return this._HttpClient.get(`https://my-json-server.typicode.com/Gamgom29/Final-QuizWebsite/subjects/${id}`);
  }
}
