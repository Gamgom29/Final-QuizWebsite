import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _HttpClient:HttpClient) { }
  createExam(model:object):Observable<any>{
    return this._HttpClient.post('https://final-db-xh9h.onrender.com/subjects',model);
  }
  getExams():Observable<any>{
    return this._HttpClient.get('https://final-db-xh9h.onrender.com/subjects');
  }
  updateExam(model:object,id:string):Observable<any>{
    return this._HttpClient.put(`https://final-db-xh9h.onrender.com/subjects/${id}`,model);
  }
  deleteExam(id:string):Observable<any>{
    return this._HttpClient.delete(`https://final-db-xh9h.onrender.com/subjects/${id}`);
  }
  getExam(id:string):Observable<any>{
    return this._HttpClient.get(`https://final-db-xh9h.onrender.com/subjects/${id}`);
  }
}
