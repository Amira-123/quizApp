import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
  
  name= new FormControl("");
  questions:any[]=[];
  formQuestion!:FormGroup;
  correctAnswer:any;
  stopStep:boolean=false;
  stepperIndex:number=0;
  subjectName:string="";
  review:boolean=false;
  allExams:any[]=[];
  add:boolean=true
  id:any;
  singleQuestion:any
  stepperOrientation: Observable<StepperOrientation>;
  constructor(private fb:FormBuilder,private service:DoctorService,private toaster:ToastrService,
    breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  ngOnInit(): void {
   this.createQuestionAndAnswer();

  }
  createQuestionAndAnswer(){
    this.formQuestion=this.fb.group({
      question:['',[Validators.required]],
      answerA:['',[Validators.required]],
      answerB:['',[Validators.required]],
      answerC:['',[Validators.required]],
      answerD:['',[Validators.required]],
      correctAnswer:[''],

    })
  }
  startAdd(){
    if(this.name.value==""){
      this.toaster.error("يجب ادخال اسم المادة")
    }
    else{
      this.subjectName=this.name.value;
      this.stopStep=true
    }
    if(this.stopStep){
      this.stepperIndex=1;
    }
  }
  checkBtn(){
    this.add=true;
    this.formQuestion.reset();
  }
  getcheckedAnswer(event:any){
   this.correctAnswer=event.value;
  }
  sendFinalQuestions(){
    const model={
      questions:this.questions,
      subjectName:this.name.value,
    }
    if(this.review){
      this.stepperIndex=2;
    }
    else{
      this.service.sendQuestionAndAnswers(model).subscribe((res:any)=>{
        this.review=true;
        this.id=res.id ///id of question
      })
    }

  }
  clearForm(){
    this.formQuestion.reset()
  }
  cancelExam(){
    this.formQuestion.reset();
    this.questions.splice(0);
    this.subjectName="";
    this.name.reset();
    this.stepperIndex=0;
    this.stopStep=false;
    this.toaster.success("تم الغاء الامتحان بنجاح");
  }
  deleteQuestion(index:number){
    this.questions.splice(index,1);
    const model={
      questions:this.questions,
      subjectName:this.name.value,
    }
    this.service.updateSubject(model,this.id).subscribe((res:any)=>{
      this.toaster.success("تم حذف السؤال بنجاح")
    },
    (error)=>{
      alert(error)
    })
  }
  getQuestionById(index:number){
    this.add=false
    this.stepperIndex=1;
    this.formQuestion.patchValue({
      question:this.questions[index].question,
      answerA:this.questions[index].answerA,
      answerB:this.questions[index].answerB,
      answerC:this.questions[index].answerC,
      answerD:this.questions[index].answerD,
    })
    this.singleQuestion=this.formQuestion.value;
  }
  updateQuestion(){
    this.add=false;
    for(let i=0;i<this.questions.length;i++){
      if(this.questions[i].question==this.singleQuestion.question){
        this.questions[i].question=this.formQuestion.value.question;
        this.questions[i].answerA=this.formQuestion.value.answerA
        this.questions[i].answerB=this.formQuestion.value.answerB
        this.questions[i].answerC=this.formQuestion.value.answerC
        this.questions[i].answerD=this.formQuestion.value.answerD;
        this.questions[i].correctAnswer=this.formQuestion.value[this.correctAnswer]
        
      }
    }
    if(this.formQuestion.value["correctAnswer"]!==null){
      const model={
        questions:this.questions,
        subjectName:this.name.value,
      }
      this.service.updateSubject(model,this.id).subscribe((res:any)=>{
        this.toaster.success("تم تحديث السؤال بنجاح");
      },
      (error)=>{
        alert(error)
      })

    }
    else{
      this.toaster.error("يجب اختيار اجابه صحيحه للسؤال")
    }
  }

  addQuestions(model:any){
    if(this.formQuestion.value["correctAnswer"]!==null){
      let model={
          question:this.formQuestion.value.question,
          answerA:this.formQuestion.value.answerA,
          answerB:this.formQuestion.value.answerB,
          answerC:this.formQuestion.value.answerC,
          answerD:this.formQuestion.value.answerD,
          correctAnswer:this.formQuestion.value[this.correctAnswer]
      }
      this.questions.push(model);
      this.formQuestion.reset();
    }
    else{
      this.toaster.error("يجب اختيار اجابه صحيحه للسؤال")
    }
  }
  addAllQuestions(question:any){
    if(this.add){
      this.addQuestions(question)
    }
    else{
      this.updateQuestion()
    }

  }

}

