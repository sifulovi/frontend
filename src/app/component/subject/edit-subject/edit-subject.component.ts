import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AssignmentService} from '../../../service/assignment.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.scss']
})
export class EditSubjectComponent implements OnInit {


  @Input() public isShowModal = false;
  @Input() public subjectId = '';
  isOkLoading = false;
  @Output() modalEmitter = new EventEmitter();
  validateForm: FormGroup;
  teacherName = '';
  image: any;
  subjectImage: File;
  teacherImage: File;
  date: null;

  subject: any = {};

  constructor(private router: Router, private fb: FormBuilder, private service: AssignmentService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      subjectName: [null, [Validators.required]],
      teacherName: [null, [Validators.required]],
    });

    this.service.getSubject(this.subjectId).subscribe(
      res => {
        this.subject = res;
      },
      err => {
      }
    );
  }


  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const formData = new FormData();


    if (this.teacherImage === undefined) {
      formData.append('teacherImageUrl', this.subject.teacherImageUrl);
    } else {
      formData.append('teacherImage', this.teacherImage, this.subjectImage.name);
    }


    if (this.subjectImage === undefined) {
      formData.append('subjectImageUrl', this.subject.imageUrl);
    } else {
      formData.append('subjectImage', this.subjectImage, this.subjectImage.name);
    }



    formData.append('subjectName', this.validateForm.value.subjectName);
    formData.append('teacherName', this.validateForm.value.teacherName);
    this.service.updateSubject(formData).subscribe(
      res => {
        console.log(res);
        window.location.href = 'subject';
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

  onFileChangedForSubject(event): void {
    this.subjectImage = event.target.files[0];
  }

  onFileChangedForTeacher(event): void {
    this.teacherImage = event.target.files[0];
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

}
