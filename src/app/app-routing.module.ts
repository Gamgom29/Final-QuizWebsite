import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { NewexamComponent } from './components/newexam/newexam.component';

const routes: Routes = [
  {path:'register' , component:RegisterComponent},
  {path:'login' , component:LoginComponent},
  {path:'subjects' , component:SubjectsComponent},
  {path:'newexam',component:NewexamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
