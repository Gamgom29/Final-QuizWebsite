import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/shared/services/doctor.service';

@Component({
  selector: 'app-newexam',
  templateUrl: './newexam.component.html',
  styleUrls: ['./newexam.component.css']
})
export class NewexamComponent {
  constructor(private _FormBuilder:FormBuilder , private _ToastrService:ToastrService , private _DoctorService:DoctorService){}
  time:FormControl = new FormControl(0);
  name:FormControl = new FormControl("");
  id!:string;
  quizTime:number = 0;
  correctNum = '';
  questions:any[] = [];
  startAdd:boolean = false;
  subName:string = '';
  stepperIndx:number = 0;
  preview:boolean = false;
  questionForm:FormGroup = this._FormBuilder.group({
    question:['' , [Validators.required]],
    answer1:['' , [Validators.required]],
    answer2:['' , [Validators.required]],
    answer3:['' , [Validators.required]],
    answer4:['' , [Validators.required]],
    correctAns:['']
  });
  getCorrect(event:any){
    this.correctNum = event.value;
    this.questionForm.value['correctAns'] = this.questionForm.value[this.correctNum];
    console.log(this.correctNum);
  }
  start(){
    if(this.name.value == ''){
      this._ToastrService.error('برجاء اختيار اسم الماده');
    }
    else if (this.time.value == 0 ){
      this._ToastrService.error('برجاء اختيار وقت الامتحان');
    }
    else {
      this.startAdd = true;
      this.stepperIndx = 1;
      this.subName = this.name.value;
      this.quizTime = this.time.value;
    }
    
  }
  submit(){
    if(this.correctNum){
      const model = this.questionForm.value ;
      this.questions.push(model);
      this.questionForm.reset();
      this.correctNum = '';
    }
    else {
      this._ToastrService.error("برجاء اختيار الاجابه الصحيحه");
    }
  }
  claerForm(){
    this.questionForm.reset()
  }
  deleteForm(){
    this.questionForm.reset();
    this.stepperIndx = 0 ;
    this.questions = [];
    this.subName = '';
    this.startAdd = false;
    this.name.reset();
    this.preview = false;
    this.correctNum = '';
  }
  createExam(){
    if(this.preview){
      this.stepperIndx = 2 ;
    }
    else {
      const model = {
        name:this.subName , 
        questions:this.questions,
        quizTime:this.quizTime
      }
      this._DoctorService.createExam(model).subscribe({
        next:res=>{
          console.log(res);
          this.preview = true;
          this.id=res.id
        },
        error:err=>{
          console.log(err);
        }
      })
    }
    }
    
    delete(indx:number):void{
      this.questions.splice(indx , 1);
      const model = {
        name:this.subName,
        questions:this.questions,
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
}
