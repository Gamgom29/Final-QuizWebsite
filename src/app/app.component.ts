import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QuizApp';
  constructor(private _AuthService:AuthService){}
  ngOnInit(): void {
      this._AuthService.getRole().subscribe({
        next:res=>{
          this._AuthService.user.next(res);
        },
        error:err=>{
          console.log(err);
        }
      });
  }
}
