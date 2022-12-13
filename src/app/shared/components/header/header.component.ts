import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData:any=null;
  constructor(private authSercive:AuthService) { }

  ngOnInit(): void {
    this.authSercive.user.subscribe((res:any)=>{
      if(res.role){
        this.userData=res;
      }
    })
  }
  logout(){
    const model={};
    this.authSercive.loginForm(model).subscribe((res:any)=>{
        this.userData=null
        this.authSercive.user.next(res)
    })
  }

}
