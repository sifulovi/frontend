import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AssignmentService} from '../../service/assignment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;


  constructor(private  router: Router, private fb: FormBuilder, private service: AssignmentService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.service.login(this.validateForm.value).subscribe(
      res => {
        debugger
        localStorage.setItem('auth', JSON.stringify(res));
        console.log(res);
        window.location.href = 'assignment';
      },
      err => {
        console.log(err);
      }
    );
  }


  login(): void {

  }

}
