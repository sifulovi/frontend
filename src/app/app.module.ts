import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './component/login/login.component';
import {RegistrationComponent} from './component/registration/registration.component';
import {HeaderComponent} from './component/header/header.component';
import {AntSharedModule} from './ant-shared.module';
import {AssignmentModule} from './component/assignment/assignment.module';
import {TeacherComponent} from './component/teacher/teacher.component';
import {CreateTeacherComponent} from './component/teacher/create-teacher/create-teacher.component';
import {SubjectComponent} from './component/subject/subject.component';
import {CreateSubjectComponent} from './component/subject/create-subject/create-subject.component';
import {EditSubjectComponent} from './component/subject/edit-subject/edit-subject.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    TeacherComponent,
    CreateTeacherComponent,
    SubjectComponent,
    CreateSubjectComponent,
    EditSubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntSharedModule,
    ReactiveFormsModule,
    AssignmentModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
