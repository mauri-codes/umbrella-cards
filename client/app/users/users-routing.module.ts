import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { UserFormComponent }      from './user-form.component';
import { UsersComponent }         from './users.component';
import { UserDetailComponent }    from './user-detail.component';
import { UserLoginComponent }     from "./user-login.component";

import { AuthGuard }              from '../security/auth.guard';
import { NotLogged }              from '../security/not-logged';
import { AdminGuard }             from '../security/admin.guard';

const usersRoutes: Routes = [
  { path: 'users',          component: UsersComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'user/:username', component: UserDetailComponent, canActivate: [AuthGuard]},
  { path: 'sign-up',        component: UserFormComponent, canActivate: [NotLogged]},
  { path: 'login',          component: UserLoginComponent, canActivate: [NotLogged]}
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
