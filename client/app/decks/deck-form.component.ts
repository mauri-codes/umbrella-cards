import { Component, Output, EventEmitter }        from '@angular/core';

import { DeckService }      from './deck-service';
import {Deck} from "./Deck";

@Component({
  moduleId: module.id,
  selector: 'deck-form',
  templateUrl: '../html/deck-form.component.html',
  styleUrls: ['../styles/forms.css', '../styles/deck-form.component.css'],
  providers: [ DeckService ]
})
export class DeckFormComponent{
  @Output() deckToAdd = new EventEmitter<string>();
  deckService: DeckService;
  deckName=   '';
  message = "";
  onDeckToAdd(value: string){
    this.deckToAdd.emit(value);
  }
  constructor(dService: DeckService){
    this.deckService = dService;
  }
  createDeck(){
    this.deckService.newDeck(this.deckName, localStorage.getItem('currentUser'))
      .subscribe(data => {
        if(data["success"]){
          this.message = data["message"];//deck created successfully
          this.onDeckToAdd(this.deckName);
        }else{
          if(data["message"] === "id already exists"){
            this.createDeck();
          }else{
            this.message = data["message"];//data base error
          }
        }
      });
  }

}

