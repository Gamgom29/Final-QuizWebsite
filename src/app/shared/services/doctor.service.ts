import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _HttpClient:HttpClient) { }
  createExam(model:object):Observable<any>{
    return this._HttpClient.post('http://localhost:3000/subjects',model);
  }
  getExams():Observable<any>{
    return this._HttpClient.get('http://localhost:3000/subjects');
  }
  updateExam(model:object,id:string):Observable<any>{
    return this._HttpClient.put(`http://localhost:3000/subjects/${id}`,model);
  }
  deleteExam(id:string):Observable<any>{
    return this._HttpClient.delete(`http://localhost:3000/subjects/${id}`);
  }
  getExam(id:string):Observable<any>{
    return this._HttpClient.get(`http://localhost:3000/subjects/${id}`);
  }
}
