import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { DeckFormComponent }      from './deck-form.component';

const usersRoutes: Routes = [
  { path: 'new-deck',          component: DeckFormComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DeckRoutingModule { }
