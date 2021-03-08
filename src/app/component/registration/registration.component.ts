import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AssignmentService} from '../../service/assignment.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  validateForm!: FormGroup;


  constructor(private  router: Router, private fb: FormBuilder, private service: AssignmentService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
      fullName: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.service.register(this.validateForm.value).subscribe(
      res => {
        this.router.navigateByUrl('/login');
      },
      err => {
        console.log(err);
      }
    );
  }

  login(): void {

  }

}
