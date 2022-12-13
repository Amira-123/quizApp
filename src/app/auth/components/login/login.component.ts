import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  users:any[]=[];
  type:string='students'
  constructor(private fb:FormBuilder,private authservice:AuthService,
    private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.getUsers()
  }
  createLoginForm(){
    this.loginForm=this.fb.group({
      type:[this.type],
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  getUsers(){
    this.authservice.getUsers(this.type).subscribe((res:any)=>{
      this.users=res;
      },(error)=>{
      alert(error)
   })
  }
  getRole(event:any){
    this.type=event.value;
    this.getUsers()
  }
  getLoginData(){
    let index=this.users.findIndex(item =>item.userEmail==this.loginForm.value.email
     && item.userPassword==this.loginForm.value.password)
    if(index == -1){
      this.toaster.error("الايميل او كلمه المرور غير صحيحه","",{
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:3000,
        closeButton: true,
      })
    }
    else{
      const Model={
        username:this.users[index].userName,
        role:this.type,
        userId:this.users[index].id
      }
        this.authservice.loginForm(Model).subscribe((res:any)=>{
        this.authservice.user.next(res)
        this.toaster.success("تم تسجيل الدخول بنجاح ","",{
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:3000,
          closeButton: true,
        })
        this.router.navigate(['/subjects'])
        },(error)=>{
        alert(error)
      })
    }

  }
}
