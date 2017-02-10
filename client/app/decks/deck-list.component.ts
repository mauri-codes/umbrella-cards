import {
  Component, trigger,
  state, style,
  transition, animate, keyframes
}  from '@angular/core';
import { Router }               from '@angular/router';

import { Deck }                 from './Deck';
import { DeckService }          from './deck-service';

@Component({
  moduleId: module.id,
  selector: 'decks',
  templateUrl: '../html/deck-list.component.html',
  styleUrls: ['../styles/deck-list.component.css'],
  providers: [ DeckService ],
  animations: [
    trigger('addDeck',[
      state('add', style({
        backgroundColor: 'rgb(255, 117, 26)',
        transform: 'rotate(0deg)'
      })),
      state('cancel', style({
        backgroundColor: 'red',
        transform: 'rotate(45deg)'
      })),
      transition('add => cancel', animate('300ms ease-in')),
      transition('cancel => add', animate('300ms ease-out'))
    ]),
    trigger('addDeck2',[
      state('cancel', style({
        transform: 'scale(1)'
      })),
      transition('void => cancel', animate(300,keyframes([
        style({transform: 'scale(0.1) translate(100px,100px)', offset:0}),
        style({transform: 'scale(1)', offset:1})
      ]))),
      transition('cancel => void', animate(300,keyframes([
        style({transform: 'scale(1)', offset:0}),
        style({transform: 'scale(0.1) translate(100px,100px)', offset:1})
      ]))),
    ])
  ]
})
export class DeckListComponent{
  decks: Deck[];
  state1: string = 'add';
  deckLength: number;
  message = "you dont have decks yet. Try creating one.";
  constructor(private deckService: DeckService){
    this.deckService.getDecks(localStorage.getItem('currentUser'))
      .subscribe(decks => {this.decks = decks; this.deckLength = decks.length}, err => console.log(err));
  }
  deckToggle(){
    return (this.state1 === 'add') ? this.state1='cancel':this.state1='add';
  }
}
