import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserFormComponent }      from './user-form.component';
import { UsersComponent }         from './users.component';
import { UserDetailComponent}     from './user-detail.component';

const usersRoutes: Routes = [
  { path: 'sign-up',        component: UserFormComponent},
  { path: 'users',          component: UsersComponent },
  { path: 'user/:username', component: UserDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
