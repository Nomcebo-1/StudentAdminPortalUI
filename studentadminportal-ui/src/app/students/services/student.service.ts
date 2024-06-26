import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:7134';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]>{
   return this.http.get<Student[]>(this.baseApiUrl + '/students');
  }

  getStudentById(id: string): Observable<Student>{
    return this.http.get<Student>(this.baseApiUrl + '/students/' + id);
  }
}
