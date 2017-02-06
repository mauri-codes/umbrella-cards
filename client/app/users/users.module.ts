import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';

import { UserListComponent }      from './user-list.component';
import { UserFormComponent }      from './user-form.component'
import { UsersComponent }         from './users.component';
import { UserDetailComponent}     from './user-detail.component';
import { UserLoginComponent}      from './user-login.component';

import { UserRoutingModule }      from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserFormComponent,
    UsersComponent,
    UserDetailComponent,
    UserLoginComponent
  ]
})
export class UsersModule {}
