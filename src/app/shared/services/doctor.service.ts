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
}
