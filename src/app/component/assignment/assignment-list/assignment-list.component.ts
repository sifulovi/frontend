import {Component, OnInit} from '@angular/core';
import {AssignmentService} from '../../../service/assignment.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit {

  assignmentList = [];
  isShowModalForCreate = false;
  isShowModalForComplete = false;
  assignmentId = '';

  constructor(private service: AssignmentService) {
  }

  ngOnInit(): void {
    this.service.getAssignmentList().subscribe(
      res => {
        this.assignmentList = res.docs;
        console.log(this.assignmentList);
      }
      , err => {
        console.log(err);
      }
    );
  }

  showModal(): void {
    this.isShowModalForCreate = true;
  }

  showModalForComplete(id): void {
    this.assignmentId = id;
    this.isShowModalForComplete = true;
    // this.isShowModalForCreate = true;
  }
}
