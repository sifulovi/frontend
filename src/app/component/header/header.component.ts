import {Component, OnInit} from '@angular/core';
import {AssignmentService} from '../../service/assignment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isShowModal = false;

  constructor(public service: AssignmentService, private  router: Router) {
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isShowModal = true;
  }

  logout(): void {
    this.service.logout();
    window.location.href = '';

  }

}
