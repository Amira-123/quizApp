import { AuthService } from './auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authservice:AuthService){}
  title = 'mcq-App';
  ngOnInit(): void {
    this.getUserData()
  }
  getUserData(){
      this.authservice.getRole().subscribe((res:any)=>{
      this.authservice.user.next(res)
      },
    (error)=>{
      alert(error)
    })
  }

}
