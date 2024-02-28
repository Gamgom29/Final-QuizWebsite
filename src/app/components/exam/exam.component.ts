import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  id:string = '';
  constructor(private _ActivatedRoute:ActivatedRoute, private _DoctorService:DoctorService , private _ToastrService:ToastrService , private _AuthService:AuthService){}
  subject!:any;
  user!:any;
  finished:boolean = false;
  total:number = 0 ;
  quizTime!:number;
  minutes!:number;
  seconds!:number;
  quizT:any;
  myCountDown:any;
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:data=>{
          this.id=data.get('id')!;
        }
      });
      this._DoctorService.getExam(this.id).subscribe({
        next:response=>{
          console.log(response);
          this.subject = response;
          this.quizTime = response.quizTime * 60;
          this.timer();
          this.stratQuiz();
        },
        error:err=>{
          console.log(err);
        }
      });
      this._AuthService.getRole().subscribe({
        next:res=>{
          this.user=res;
        },
        error:err=>{
          console.log(err);
        }
      });

  }
  stratQuiz():void{
      this.quizT = setTimeout(() => {
      this.getResult();
      }, this.quizTime * 1000);
  }
  timer(){
    this.myCountDown = setInterval(()=>{
      this.countDown()
    } , 1000);
  }
  countDown(){
    this.minutes = Math.floor(this.quizTime / 60);
    this.seconds = this.quizTime % 60 ;
    this.quizTime--;
  }
  delete(indx:number):void{
    this.subject.questions.splice(indx , 1);
    const model = {
      name:this.subject.name,
      questions:this.subject.questions,
    }
    this._DoctorService.updateExam(model ,this.id).subscribe({
      next:res=>{
        console.log(res);
        this._ToastrService.success('تم حذف السؤال بنجاح');
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  getAnswer(event:any){
    let answer:string = event.value;
    let questionIdx = event.source.name;
    this.subject.questions[questionIdx].studentAns = answer;
    console.log(this.subject);
  }
  getResult(){
    this.finished = true;
    clearInterval(this.myCountDown);
    clearTimeout(this.quizT);
    for(let x in this.subject.questions){
      if(this.subject.questions[x].correctAns == this.subject.questions[x].studentAns){
        this.total ++ ;
      }
    }
    console.log(this.total);
  }
}
