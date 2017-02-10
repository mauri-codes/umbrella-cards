import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { DeckListComponent }      from './deck-list.component';

const usersRoutes: Routes = [
  { path: 'decks',          component: DeckListComponent}
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
