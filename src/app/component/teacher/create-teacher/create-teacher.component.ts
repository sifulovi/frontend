import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AssignmentService} from '../../../service/assignment.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})
export class CreateTeacherComponent implements OnInit {

  @Input() public isShowModal = false;
  isOkLoading = false;
  @Output() modalEmitter = new EventEmitter();
  validateForm: FormGroup;
  teacherName = '';
  image: any;
  teacherImage: File;
  date: null;

  constructor(private router: Router, private fb: FormBuilder, private service: AssignmentService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
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
    formData.append('imageUrl', this.teacherImage, this.teacherImage.name);
    formData.append('teacherName', this.validateForm.value.teacherName);
    debugger
    this.service.saveTeacher(formData).subscribe(
      res => {
        console.log(res);
        window.location.href = 'teacher';
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
    this.teacherImage = event.target.files[0];
  }

  onFileChangedForTeacher(event): void {
    this.teacherImage = event.target.files[0];
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

}
