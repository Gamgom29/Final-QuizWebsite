import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  user:any = null;
  constructor(private _AuthService:AuthService){}
  ngOnInit(): void {
      this._AuthService.user.subscribe({
        next:data=>{
          if(data?.role){
            this.user = data;
          }
        }
      })
  }
  logout(){
    const model={}
    this._AuthService.login(model).subscribe({
      next:res=>{
        this.user = null;
        this._AuthService.user.next(res);
      }
    })
  }
}
