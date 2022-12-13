import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  students:any[]=[]
  registerForm!:FormGroup;
  constructor(private fb:FormBuilder,private authservice:AuthService,
    private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.createForm();
    this.getStudents()
    }
  createForm(){
    this.registerForm=this.fb.group({
      name:['',[Validators.required,Validators.minLength(2)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]]
    })
  }

  get name(){
    return this.registerForm.get('name')
  }
  get email(){
    return this.registerForm.get('email')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get confirmPassword(){
    return this.registerForm.get('confirmPassword')
  }
  getStudents(){
    this.authservice.getUsers('students').subscribe((res:any)=>{
      this.students=res ;
    })
  }
  getRegisterData(){
    let Model={
      userName:this.registerForm.value.name,
      userEmail:this.registerForm.value.email,
      userPassword:this.registerForm.value.password
    }
    let index=this.students.findIndex(item =>item.userEmail==this.registerForm.value.email)
    if(index !== -1){
      this.toaster.error("الايميل موجود بالفعل","",{
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      })
    }
    else{
        this.authservice.registerForm(Model).subscribe((res:any)=>{
          this.toaster.success("تم انشاء الحساب بنجاح","",{
            disableTimeOut: false,
            titleClass: "toastr_title",
            messageClass: "toastr_message",
            timeOut:5000,
            closeButton: true,
          })
          const model = {
            username:res.userName,
            role:'students',
            userId:res.id
          }
          this.authservice.loginForm(model).subscribe((res:any)=>{
            this.authservice.user.next(res)
          })
        this.router.navigate(['/subjects']);
        }
        )}
  
    }
}

