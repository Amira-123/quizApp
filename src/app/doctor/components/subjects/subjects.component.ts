import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  allSubjects:any[]=[];
  role:any
  constructor(private service:DoctorService,private authService:AuthService,
    private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getAllSubjects();
    this.getRole();
  }
  getAllSubjects(){
    this.service.getAllSubjects().subscribe((res:any)=>{
    this.allSubjects=res;
    },
    (error)=>{alert(error)})
  }
  getRole(){
    this.authService.getRole().subscribe((res:any)=>{
      this.role=res
    })
  }
  deleteSubject(index:number){
    let id=this.allSubjects[index].id
    this.allSubjects.splice(index,1);
    this.service.deleteSubject(id).subscribe((res:any)=>{
      this.toaster.success("تم حذف الماده بنجاح")
    })
    
  }
}
