import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }
  sendQuestionAndAnswers(subject:any){
    return this.http.post(environment.baseApi+'subjects',subject)
  }
  updateSubject(model:any,id:number){
    return this.http.put(environment.baseApi+'subjects/'+id,model)
  }
  getAllSubjects(){
    return this.http.get(environment.baseApi+'subjects')
  }
  deleteSubject(id:number){
    return this.http.delete(environment.baseApi+'subjects/'+id)
  }
  getSubjectById(id:number){
    return this.http.get(environment.baseApi+'subjects/'+id)
  }
}
