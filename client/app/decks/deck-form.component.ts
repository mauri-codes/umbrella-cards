import { Component }        from '@angular/core';

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
  deckService: DeckService;
  deckName=   '';
  message = "";
  constructor(dService: DeckService){
    this.deckService = dService;
  }
  createDeck(){
    this.deckService.newDeck(this.deckName, localStorage.getItem('currentUser'))
      .subscribe(data => {
        if(data["success"]){
          this.message = data["message"];//deck created successfully
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

