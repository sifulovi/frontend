import {Component, OnInit} from '@angular/core';
import {AssignmentService} from '../../service/assignment.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  isShowModalForCreate = false;
  isShowModalForUpdate = false;

  subjectName = [];
  subjectId = '';

  constructor(private service: AssignmentService,
              private nzMessageService: NzMessageService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.service.getSubjectList().subscribe(
      res => {
        this.subjectName = res.docs;
      },
      err => {
        console.log(err);
      }
    );
  }

  showModal(): void {
    this.isShowModalForCreate = true;
  }
  showModalForUpdate(id): void {
    this.isShowModalForUpdate = true;
    this.subjectId = id;
  }

  deleteSubject(id, payload): void {
    this.service.deleteSubject(id, payload).subscribe(
      res => {
        this.ngOnInit();
        this.notification.create(
          'success',
          'Subject delete successfully',
          ''
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  getSubject(id): void {
    this.service.getSubject(id).subscribe(
      res => {
        this.subjectName = res.docs;
      },
      err => {
        console.log(err);
      }
    );
  }

  cancel(): void {

  }
}
