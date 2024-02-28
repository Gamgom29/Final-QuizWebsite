import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects:any[]= [];
  user:any = {};
  constructor(private _DoctorService:DoctorService , private _AuthService:AuthService , private _ToastrService:ToastrService){}
  ngOnInit(): void {
    this._DoctorService.getExams().subscribe({
      next:res=>{
        this.subjects = res;
      },
      error:err=>{
        console.log(err);
      }
    });
    this._AuthService.getRole().subscribe({
      next:res=>{
        this.user = res;
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  deleteSub(id:string , idx:number){
    this._DoctorService.deleteExam(id).subscribe({
      next:res=>{
        this.subjects.splice(idx , 1);
        this._ToastrService.success('تم حذف الماده بنجاح');
        console.log(res);
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}
