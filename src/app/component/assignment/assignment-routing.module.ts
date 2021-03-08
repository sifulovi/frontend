import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {RegistrationComponent} from '../registration/registration.component';
import {AssignmentListComponent} from './assignment-list/assignment-list.component';
import {CreateAssignmentComponent} from './create-assignment/create-assignment.component';
import {EditAssignmentComponent} from './edit-assignment/edit-assignment.component';

const routes: Routes = [
  {path: '', component: AssignmentListComponent},
  {path: 'create', component: CreateAssignmentComponent},
  {path: 'edit/:id', component: EditAssignmentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule {
}
