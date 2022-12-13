import { RouterModule } from '@angular/router';
import { AuthModule } from './../auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { NewExamComponent } from './components/new-exam/new-exam.component';
import { StudentsComponent } from './components/students/students.component';




@NgModule({
  declarations: [
    SubjectsComponent,
    NewExamComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule ,
    AuthModule,
    RouterModule,
   FormsModule
   ],
  exports:[
    SubjectsComponent,
    NewExamComponent,
    StudentsComponent,
  ]
})
export class DoctorModule { }
