import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  API = 'http://localhost:8010/api';

  constructor(private http: HttpClient) {
  }


  login(payload): any {
    return this.http.post(`${this.API}/user/login`, payload);
  }

  register(payload): any {
    return this.http.post(`${this.API}/user/register`, payload);
  }


  getAssignmentList(): any {
    return this.http.get(`${this.API}/assignments`);
  }

  getAssignment(id): any {
    return this.http.get(`${this.API}/assignments/${id}`);

  }


  saveAssignment(data): any {
    return this.http.post(`${this.API}/assignments`, data);
  }

  updateAssignment(data): any {
    return this.http.put(`${this.API}/assignments`, data);
  }

  logout(): any {
    localStorage.removeItem('auth');
    localStorage.clear();
  }

  getData(): any {
    const asd = JSON.parse(localStorage.getItem('auth'));
    return asd !== null;
  }


  saveTeacher(data): any {

    return this.http.post(`${this.API}/teachers`, data);
  }

  getTeacherList(): any {
    return this.http.get(`${this.API}/teachers`);
  }

  saveSubject(data): any {

    return this.http.post(`${this.API}/subjects`, data);
  }

  getSubjectList(): any {
    return this.http.get(`${this.API}/subjects`);
  }

  getSubject(id): any {
    return this.http.get(`${this.API}/subjects/${id}`);
  }

  deleteSubject(id, payload): any {
    return this.http.delete(`${this.API}/subjects/${id}`, payload);
  }

  updateSubject(data): any {

    return this.http.put(`${this.API}/subjects`, data);
  }

}
