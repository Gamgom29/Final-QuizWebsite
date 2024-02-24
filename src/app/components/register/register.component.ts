import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router
  ,private toastr: ToastrService){}
  ngOnInit(): void {
      this.getUsers();
  }
  users:any[] = [];
  registerForm:FormGroup= this._FormBuilder.group(
  { 
    name:['',[RxwebValidators.required]],
    email:['',[Validators.email,RxwebValidators.required({message:'Email Is Required'})]],
    password:['',[RxwebValidators.required,RxwebValidators.password]],
    repassword:['',[RxwebValidators.required,RxwebValidators.compare({fieldName:'password'})]]
  }
  );
  getUsers(){
    this._AuthService.getUsers('students').subscribe({
      next:res=>{
        this.users = res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  handleForm(){
    if(this.registerForm.valid){
      const model = {
        userName:this.registerForm.value.name,
        email:this.registerForm.value.email,
        password:this.registerForm.value.password
      };
      let index = this.users.findIndex(item=> item.email == this.registerForm.value.email);
      if(index !== -1){
        this.toastr.error('الايميل موجود مسبقا','' , {
          timeOut:2500,
          progressBar:true,
          closeButton:true
        })
      }
      else {
        this._AuthService.createUser(model).subscribe({
          next:response=>{
            this.toastr.success('تم انشاء الحساب بنجاح','',{
              timeOut:2500,
            })
            this._Router.navigate(['/login']);
            console.log(response);
          },
          error:err=>{
            console.log(err);
          }
        });
      }
      
    }
  }
}
