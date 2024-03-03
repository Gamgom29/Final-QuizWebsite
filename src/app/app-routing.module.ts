import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { NewexamComponent } from './components/newexam/newexam.component';
import { ExamComponent } from './components/exam/exam.component';
import { StudentsComponent } from './components/students/students.component';

const routes: Routes = [
  {path:'' , redirectTo:'login' , pathMatch:'full'},
  {path:'register' , component:RegisterComponent},
  {path:'login' , component:LoginComponent},
  {path:'subjects' , component:SubjectsComponent},
  {path:'exam/:id' , component:ExamComponent},
  {path:'newexam',component:NewexamComponent},
  {path:'students',component:StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
