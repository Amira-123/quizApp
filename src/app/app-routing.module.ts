import { StudentsComponent } from './doctor/components/students/students.component';
import { ExamComponent } from './student/components/exam/exam.component';
import { NewExamComponent } from './doctor/components/new-exam/new-exam.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SubjectsComponent } from './doctor/components/subjects/subjects.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'exam/:id',component:ExamComponent},
  {path:'subjects',component:SubjectsComponent},
  {path:'students',component:StudentsComponent},
  {path:'new-exam',component:NewExamComponent},
  {path:'**',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
