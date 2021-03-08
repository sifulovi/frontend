import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AssignmentRoutingModule} from './assignment-routing.module';
import {AssignmentListComponent} from './assignment-list/assignment-list.component';
import {AntSharedModule} from '../../ant-shared.module';
import {CreateAssignmentComponent} from './create-assignment/create-assignment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssignemntMarkingComponent} from './assignemnt-marking/assignemnt-marking.component';


@NgModule({
  declarations: [
    AssignmentListComponent,
    CreateAssignmentComponent,
    AssignemntMarkingComponent
  ],
  exports: [
    CreateAssignmentComponent
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    AntSharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AssignmentModule {
}
