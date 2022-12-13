import { AuthService } from './../../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from './../../../doctor/services/doctor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  id:any;
  subject:any;
  role:any;
  total:number=0;
  showResult:boolean=false;
  studentInfo:any;
  userSubjects:any[]=[];
  validExam:boolean=true;
  constructor(private activatedRoute:ActivatedRoute,private service:DoctorService,
    private toaster:ToastrService,private authService:AuthService) {
      this.id=this.activatedRoute.snapshot.params['id'];
     }

  ngOnInit(): void {
   this.getSubjectById();
   this.getLogedInUser()
  }
  getSubjectById(){
    this.service.getSubjectById(this.id).subscribe((res:any)=>{
      this.subject=res;
    })
  }

  getLogedInUser(){
    this.authService.getRole().subscribe((res:any)=>{
      this.role=res;
      this.getUserData()
    })
  }
  getUserData(){
    this.authService.getStudentById(this.role.userId).subscribe((res:any)=>{
    this.studentInfo=res;
    this.userSubjects=res?.subjects ? res?.subjects :[] ;
    this.checkValidExam();
    })
  }
  deleteQuestion(index:number){
    this.subject.questions.splice(index,1);
    const model={
      questions:this.subject.questions,
      subjectName:this.subject.subjectName,
    }
    this.service.updateSubject(model,this.id).subscribe((res:any)=>{
      this.toaster.success("تم حذف السؤال بنجاح")
    },
    (error)=>{
      alert(error)
    })
  }
  checkValidExam(){
    for(let x in this.userSubjects){
      if(this.userSubjects[x].id==this.id){
        this.total=this.userSubjects[x].degree;
        this.validExam=false;
        if(this.role.role=="students"){
          this.toaster.warning("لقد امتنحت هذه الماده من قبل");
        }
      }
    }
  }
  getcheckedAnswer(event:any){
    let checkedAnswer=event.value,
        questionIndex=event.source.name;
        this.subject.questions[questionIndex].studentAnswer=checkedAnswer;
  }
  getResult(){
    this.total=0;
    for (let value in this.subject.questions){
      if(this.subject.questions[value].studentAnswer==this.subject.questions[value].correctAnswer){
        this.total++
      }
    }
    this.showResult=true;
    this.userSubjects.push({
      name:this.subject.subjectName,
      id:this.id,
      degree:this.total
     })
    const model={
      userName:this.studentInfo.userName,
      userEmail:this.studentInfo.userEmail,
      userPassword:this.studentInfo.userPassword,
      subjects:this.userSubjects

    }
    this.authService.updateStudent(this.role.userId,model).subscribe((res:any)=>{
      this.toaster.success("تم تسجيل النتيجه بنجاح")
    })
  }
}
