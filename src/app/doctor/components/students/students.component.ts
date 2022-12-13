import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  
  displayedColumns: any;
  dataSource:any;
  //  dataTable:any[]=[]
  dataTable:any;
  constructor(private authservice:AuthService) {
    this.displayedColumns=['position','name','subjectName','degree'];
  }

  ngOnInit(): void {
    this.getAllStudents()
  }
  getAllStudents(){
    this.authservice.getUsers("students").subscribe((res:any)=>{
      this.dataSource=res?.map((student:any)=>{
        if(student?.subjects){
            return student?.subjects?.map((subject:any)=>{
            return {
              name:student.userName,
              subjectName:subject.name,
              degree:subject.degree
            }
          })
        }
        else {
          return [{
            name:student.userName,
            subjectName:"-",
            degree:"-"
          }]
        }
       
      })
      this.dataTable=[]
      this.dataSource.forEach((item:any) => {
        item.forEach((subItem:any)=>{
          this.dataTable.push({
            name:subItem.name,
            subjectName:subItem.subjectName,
            degree:subItem.degree
          })
        })
        
      });
    })
  }



}
