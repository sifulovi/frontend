import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {RegistrationComponent} from './component/registration/registration.component';
import {AssignmentGuard} from './interceptor/assignment.guard';
import {TeacherComponent} from './component/teacher/teacher.component';
import {SubjectComponent} from './component/subject/subject.component';

const routes: Routes = [
  {path: 'login', pathMatch: 'full', redirectTo: '', component: LoginComponent},
  {path: 'teacher', pathMatch: 'full', component: TeacherComponent},
  {path: 'subject', pathMatch: 'full', component: SubjectComponent},
  {path: '', pathMatch: 'full', component: LoginComponent},

  {path: 'registration', pathMatch: 'full', component: RegistrationComponent},
  {
    path: 'assignment',
    canActivate: [AssignmentGuard],
    loadChildren: () => import('./component/assignment/assignment.module').then(m => m.AssignmentModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
