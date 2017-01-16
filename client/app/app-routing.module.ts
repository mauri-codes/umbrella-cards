import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WelcomeComponent}       from "./welcome.component";
import { UsersComponent}         from "./users.component";
import { NotFoundComponent}      from "./not-found.component";
import { UserFormComponent }     from './user-form.component';


const appRoutes: Routes = [
  { path: '',           component: WelcomeComponent },
  { path: 'sign-up',    component: UserFormComponent},
  { path: 'users',      component: UsersComponent },
//{ path: '',           redirectTo: 'welcome', pathMatch: 'full'},
  { path: '**',         component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{}
