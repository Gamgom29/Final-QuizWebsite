import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {
  dataSource:any;
  dataTable:any;
  displayedColumns: string[] = ['position', 'name', 'subjectName', 'degree'];
  constructor(private _AuthService:AuthService){}
  ngOnInit(): void {
      this.getStudents();
  }
  getStudents(){
    this._AuthService.getUsers('students').subscribe({
      next:(res:any)=>{
        this.dataSource = res.map((student:any)=>{
          if(student.subjects){
            return student.subjects?.map((sub:any)=>{
              return {
                name:student.userName,
                subjectName:sub.name,
                degree:sub.degree
              }
            })
          }
          else {
            return [{
                name:student.userName,
                subjectName:'-',
                degree:'-'
            }];
          }
          
        });
        this.dataTable = [];
        this.dataSource.forEach((element:any) => {
          element.forEach((subitem:any) => {
            this.dataTable.push({
              name:subitem.name,
              subjectName:subitem.subjectName,
              degree:subitem.degree
            });
          });
        });
        console.log(this.dataTable);
      }
    })
  }
}
