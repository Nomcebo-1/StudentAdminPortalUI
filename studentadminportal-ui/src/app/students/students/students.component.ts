import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../services/student.service';
import { response } from 'express';
import { error } from 'console';
import { Student } from '../../models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>()
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  filterString = '';


  constructor(private studentService : StudentService){

  }

  ngOnInit(): void {
    // fetch stude nts
    this.studentService.getAllStudents().subscribe({
      next: (response) => {
        this.students = response;
        this.dataSource = new MatTableDataSource<Student>(this.students)

        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator;

        }
        if(this.matSort){
          this.dataSource.sort = this.matSort;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterStudents(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
