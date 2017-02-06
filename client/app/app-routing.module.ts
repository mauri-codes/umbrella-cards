import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WelcomeComponent}       from "./welcome.component";
import { NotFoundComponent}      from "./not-found.component";

const appRoutes: Routes = [
  { path: '',           component: WelcomeComponent},
  // { path: 'users',      component: UsersComponent },
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
