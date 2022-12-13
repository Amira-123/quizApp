import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './components/exam/exam.component';


@NgModule({
  declarations: [
    ExamComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
    
  ],
  exports:[
    ExamComponent
  ]
})
export class StudentModule { }
