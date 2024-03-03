import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { password } from '@rxweb/reactive-form-validators';
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
  constructor(private _ActivatedRoute:ActivatedRoute, private _DoctorService:DoctorService ,
  private _ToastrService:ToastrService , private _AuthService:AuthService){}
  subject!:any;
  user!:any;
  finished:boolean = false;
  total:any = 0 ;
  quizTime!:number;
  minutes!:number;
  seconds!:number;
  quizT:any;
  studentInfo:any;
  myCountDown:any;
  userSubjects:any[] = [];
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:data=>{
          this.id=data.get('id')!;
        }
      });
      this._DoctorService.getExam(this.id).subscribe({
        next:response=>{
          this.subject = response;
          console.log(this.subject);
          this._AuthService.getRole().subscribe({
            next:res=>{
              this.user=res;
              this._AuthService.getUser(this.user.userId).subscribe({
                next:response=>{
                  this.studentInfo = response;
                  this.userSubjects =  response.subjects ? response.subjects  : [] ;
                  this.checkValidExam();
                  console.log(this.studentInfo);
                }
              });
              if(this.user.role == 'students'){
                this.quizTime = response.quizTime * 60;
                this.timer();
                this.stratQuiz();
              }
            },
            error:err=>{
              console.log(err);
            }
          });
          
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
        this.total++ ;
      }
    }
    console.log(this.total);
    let subindx = this.userSubjects.findIndex(item=> item.name == this.subject.name);
    if(subindx == -1){
      this.userSubjects.push({
        name:this.subject.name,
        id:this.id,
        degree:this.total
      })
    }
    const model = {
      userName:this.studentInfo.userName,
      email:this.studentInfo.email,
      password:this.studentInfo.password,
      subjects: this.userSubjects
    };
    this._AuthService.updateUser(this.studentInfo.id , model).subscribe({
      next:res=>{
        console.log(res);
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  checkValidExam(){
    for(let i in this.userSubjects){
      if(this.userSubjects[i].id == this.id){
        clearInterval(this.myCountDown);
        clearTimeout(this.quizT);
        this.total = this.userSubjects[i].degree;
        this.finished = true;
      }
    }
  }
}
