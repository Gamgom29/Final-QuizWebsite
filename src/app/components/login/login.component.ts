import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router
    ,private toastr: ToastrService){}
    ngOnInit(): void {
      this.getUsers();
  }
  hide = true;
  users:any [] = [];
  type:string = 'students';
  loginForm:FormGroup= this._FormBuilder.group(
    { 
      email:['',[Validators.email,RxwebValidators.required({message:'Email Is Required'})]],
      password:['',[RxwebValidators.required,RxwebValidators.password]],
      type:[this.type]
    }
    );
    handleForm(){
      if(this.loginForm.valid){
        let index = this.users.findIndex(item=> item.email == this.loginForm.value.email && item.password == this.loginForm.value.password);
        if(index == -1){
          this.toastr.error('الايميل او كلمه المرو غير صحيحه','' , {
            timeOut:2500,
            progressBar:true,
            closeButton:true
          })
        }
        else {
          const model = {
            userName:this.users[index].userName,
            role:this.type , 
            userId:this.users[index].id
          };
          this._AuthService.login(model).subscribe({
            next:response=>{
              this.toastr.success('تم تسجيل الدخول بنجاح','',{
                timeOut:2500,
              });
              this._AuthService.user.next(response);
              this._Router.navigate(['/subjects']);
              console.log(response);
            },
            error:err=>{
              console.log(err);
            }
          });
        }
        
      }
    }
    getUsers(){
      this._AuthService.getUsers(this.type).subscribe({
        next:res=>{
          this.users = res;
        },
        error:err=>{
          console.log(err);
        }
      })
    }
    getRole(event:any){
      this.type = event.value;
      this.getUsers();
    }
}
