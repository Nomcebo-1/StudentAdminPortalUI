import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { Student } from '../../models/ui-models/student.model';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent implements OnInit {

  studentId: string | null | undefined;
  student: Student = {
    id:'',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
  
    }

  }

  constructor(private studentService: StudentService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.studentId = param.get('id');

        if(this.studentId){
          this.studentService.getStudentById(this.studentId).subscribe({
            next: (response) => {
              this.student = response;
            }
          });
        }
      }
    })
    
  }

}
