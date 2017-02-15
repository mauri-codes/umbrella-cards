import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';

import { DeckRoutingModule }      from './decks-routing.module';
import { DeckFormComponent }      from './deck-form.component';
import { DeckListComponent }      from './deck-list.component';
import { DeckDetailComponent }    from './deck-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DeckRoutingModule
  ],
  declarations: [
    DeckFormComponent,
    DeckListComponent,
    DeckDetailComponent
  ]
})
export class DecksModule {}
