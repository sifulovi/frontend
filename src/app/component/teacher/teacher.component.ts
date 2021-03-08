import {Component, OnInit} from '@angular/core';
import {AssignmentService} from '../../service/assignment.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  isShowModalForCreate = false;

  teacherList = [];

  constructor(private service: AssignmentService) {
  }

  ngOnInit(): void {
    this.service.getTeacherList().subscribe(
      res => {
        this.teacherList = res.docs;
      },
       err => {
         console.log(err);
       }
    );
  }

  showModal(): void {
    this.isShowModalForCreate = true;
  }
}
