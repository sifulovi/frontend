import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AssignmentService} from '../../../service/assignment.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent implements OnInit {

  @Input() public isShowModal = false;
  isOkLoading = false;
  @Output() modalEmitter = new EventEmitter();
  validateForm: FormGroup;
  teacherName = '';
  image: any;
  subjectImage: File;
  teacherImage: File;
  date: null;

  constructor(private router: Router, private fb: FormBuilder, private service: AssignmentService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      subjectName: [null, [Validators.required]],
      teacherName: [null, [Validators.required]],
    });
  }


  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const formData = new FormData();
    formData.append('teacherImage', this.teacherImage, this.teacherImage.name);
    formData.append('subjectImage', this.subjectImage, this.subjectImage.name);
    formData.append('subjectName', this.validateForm.value.subjectName);
    formData.append('teacherName', this.validateForm.value.teacherName);
    this.service.saveSubject(formData).subscribe(
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
