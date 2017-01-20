import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';

import { UserListComponent }      from './user-list.component';
import { UserFormComponent }      from './user-form.component'
import { UsersComponent }         from './users.component';

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
    UsersComponent
  ]
})
export class UsersModule {}
