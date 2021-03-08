import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AssignmentService} from '../../../service/assignment.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-assignemnt-marking',
  templateUrl: './assignemnt-marking.component.html',
  styleUrls: ['./assignemnt-marking.component.scss']
})
export class AssignemntMarkingComponent implements OnInit {

  @Input() public isShowModal = false;
  @Input() public assignmentId = false;
  isOkLoading = false;
  @Output() modalEmitter = new EventEmitter();
  validateForm: FormGroup;
  image: any;
  selectedFile: File;
  date: null;
  assignment: any = {};


  constructor(private notification: NzNotificationService, private router: Router, private fb: FormBuilder, private service: AssignmentService) {
  }

  ngOnInit(): void {

    this.service.getAssignment(this.assignmentId).subscribe(
      res => {
        console.log(res);
        this.assignment = res;
      },
      err => {
      }
    );


    this.validateForm = this.fb.group({
      assignmentMark: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
  }


  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }


    /*    const formData = new FormData();
        formData.append('image', this.selectedFile, this.selectedFile.name);
        formData.append('studentId', this.validateForm.value.studentId);
        formData.append('assignmentTitle', this.validateForm.value.assignmentTitle);
        formData.append('date', this.date);
        // @ts-ignore
        formData.append('isComplete', true);*/

    const payload = {
      ...this.assignment,
      ...this.validateForm.value
    };
    this.service.updateAssignment(payload).subscribe(
      res => {
        console.log(res);
        this.notification.create(
          'success',
          'Subject Save successfully',
          ''
        );
        window.location.href = 'assignment';
      },
      err => {
        console.log(err);
      }
    );
  }


  handleCancel(): void {
    this.handleModalEmitter();
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.handleModalEmitter();
  }

  handleModalEmitter(): void {
    this.isShowModal = false;
    this.modalEmitter.emit(this.isShowModal);
  }

  onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
  }


  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

}
