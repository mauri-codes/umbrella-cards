import {
  Component, Input, Output, EventEmitter,
  trigger, state, style,
  transition, animate, keyframes
}  from '@angular/core';

import { DeckService }        from './deck-service';
import {Deck} from "./Deck";

@Component({
  moduleId: module.id,
  selector: 'flashcard',
  templateUrl: '../html/flashcard.component.html',
  styleUrls: ['../styles/flashcard.component.css'],
  providers: [DeckService],
  animations: [
    trigger('formAnimation',[
      state('normal', style({
        transform: 'scale(0)',
        height: '0'
      })),
      state('editing', style({
        transform: 'scale(1)',
        height: 'auto'
      })),
      state('deleting', style({
        transform: 'scale(0)',
        height: '0'
      })),
      transition('normal <=> editing', animate('300ms ease-in-out'))
    ]),
    trigger('delete',[
      state('show',style({
        transform:'translate(0px, 0px)'
      })),
      state('hide',style({
        height: '0px',
        width: '0px',
        overflow: 'hidden',
        opacity: 0,
        transform:'translate(-50px, 0px)'
      })),
      transition('show => hide', animate('300ms 1000ms ease-in-out')),
      transition('void => show', animate(200,keyframes([
        style({transform:'translate(-1000px, 0px)', offset:0}),
        style({transform:'translate(100px, 0px)', offset:0.9})
      ])))
    ])
  ]
})
export class FlashcardComponent{
  state:                  string;
  state2:                 string;
  @Input() front:         string;
  @Input() back:          string;
  @Input() id:            string;
  @Input() num:           number; // the number in parent's array
  efront:                 string; // edited front
  eback:                  string; // edited back
  message:                string;
  constructor(private deckService: DeckService){
    this.state = "normal";
    this.state2= "show";
  }
  edit(){
    this.efront = this.front;
    this.eback = this.back;
    this.state = "editing";
    this.message = "";
  }
  setFlashcard(){
    this.deckService.setFlashcard(this.efront, this.eback, this.id)
      .subscribe(data => {
        if(data['success']){
          this.message = "flashcard changed correctly";
          this.state = 'normal';
          this.front = this.efront;
          this.back = this.eback;
        }else{
          this.message = "there was an error, try again in a few seconds";
        }
      });
  }
  delFlashcard(){
    this.deckService.delFlashcard(this.id)
      .subscribe(data => {
        if(data['success']){
          this.state2 = "hide";
          this.message = "deleted successfully";
        }else{
          this.message = "there was an error.";
        }
      });
  }
  cancel(){
    this.state = "normal";
  }
  deleteFl(){
    this.state = "deleting";
    this.message = "";
  }
  keyfront(value:string){
    this.efront = value;
  }
  keyback(value:string){
    this.eback = value;
  }
}
