import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AssignmentService} from '../../../service/assignment.service';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.scss']
})
export class CreateAssignmentComponent implements OnInit {

  @Input() public isShowModal = false;
  isOkLoading = false;
  @Output() modalEmitter = new EventEmitter();
  validateForm: FormGroup;
  teacherName = '';
  image: any;
  assignmentImage: File;
  teacherImage: any;
  subjectImage: any;

  date: null;

  studentList = [
    {name: 'Berenice Tatterton'},
    {name: 'Kylie Sabati'},
    {name: 'Heinrik Klemencic'},
    {name: 'Quillan Burstow'},
    {name: 'Clementius Mendenhall'},
    {name: 'Bathsheba Cogdon'},
    {name: 'Gardie Glasby'},
    {name: 'Camile Pauleit'},
    {name: 'Casey Andreoletti'},
    {name: 'Irving Sainteau'},
    {name: 'Rancell Benning'},
    {name: 'Chuck Groundwator'},
    {name: 'Barnabas Somerlie'},
    {name: 'Montgomery Rudloff'},
    {name: 'Richy Maymand'},
    {name: 'Cecile Dowdle'},
    {name: 'Gris Findley'},
    {name: 'Warren Hallihane'},
    {name: 'Lane Attwater'},
    {name: 'Bobinette Lindop'}];

  subjectList = [];
  teacherList = [];

  constructor(private notification: NzNotificationService, private router: Router, private fb: FormBuilder, private service: AssignmentService) {
  }

  ngOnInit(): void {

    this.loadData();
    this.validateForm = this.fb.group({
      student: [null, [Validators.required]],
      teacher: [null, [Validators.required]],
      teacherName: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      assignmentTitle: [null, [Validators.required]],
      date: [null, [Validators.required]],
      isComplete: [null, [Validators.required]]
    });
  }


  loadData(): void {
    this.service.getSubjectList().subscribe(
      res => {
        this.subjectList = res.docs;
      },
      err => {
        console.log(err);
      }
    );

    this.service.getTeacherList().subscribe(
      res => {
        this.teacherList = res.docs;
      },
      err => {
        console.log(err);
      }
    );

  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }


    const data = {
      subjectImageUrl: this.subjectImage,
      teacherImageUrl: this.teacherImage,
      student: this.validateForm.value.student,
      teacher: this.validateForm.value.teacher,
      assignmentTitle: this.validateForm.value.assignmentTitle,
      date: this.date,
      isComplete: false,
    };

    this.service.saveAssignment(data).subscribe(
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

  onFileChangedForAssignment(event): void {
    this.assignmentImage = event.target.files[0];
  }

  onFileChangedForTeacher(event): void {
    this.teacherImage = event.target.files[0];
  }

  onChangeSubject(value): void {
    const obj = this.subjectList.find(sub => sub.subjectName === value);
    this.subjectImage = obj.imageUrl;
    this.teacherName = obj.teacherName;
    this.teacherImage = obj.teacherImageUrl;

  }


  onChangeTeacher(value): void {

    const obj = this.teacherList.find(sub => sub.teacherName === value);

    this.teacherImage = obj.imageUrl;
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }


}
