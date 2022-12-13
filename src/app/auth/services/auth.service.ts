import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user=new Subject()
  constructor(private http:HttpClient) { }
  
  registerForm(model:any){
    return this.http.post(environment.baseApi+'students',model)
  }
  loginForm(model:any){
    return this.http.put(environment.baseApi+'login/1',model)
  }
  getUsers(type:string){
    return this.http.get(environment.baseApi+type)
  }
  getStudentById(id:number){
    return this.http.get(environment.baseApi+'students/'+id)
  }
  getRole(){
    return this.http.get(environment.baseApi+'login/1')
  }

  updateStudent(id:number , model:any){
    return this.http.put(environment.baseApi+"students/"+id ,model)
  }
}
