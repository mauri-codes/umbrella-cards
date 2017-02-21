import {
  Component, Input, Output, EventEmitter,
  trigger, state, style,
  transition, animate, keyframes
}  from '@angular/core';

import { DeckService }        from './deck-service';

@Component({
  moduleId: module.id,
  selector: 'flashcard-form',
  templateUrl: '../html/flashcard-form.component.html',
  styleUrls: ['../styles/forms.css', '../styles/flashcard-form.component.css'],
  providers: [DeckService],
  animations: [
    trigger('button',[
      state('hidden', style({
        backgroundColor: 'rgb(72, 198, 43)',
        transform: 'rotate(0deg)'
      })),
      state('show', style({
        backgroundColor: 'rgb(244, 116, 65)',
        transform: 'rotate(45deg)'
      })),
      transition('hidden <=> show', animate('300ms ease-in-out'))
    ]),
    trigger('bar',[
      state('hidden', style({
        width: '0px',
        height: '60px',
        backgroundColor: 'rgb(72, 198, 43)',
        color: 'rgb(72, 198, 43)'
      })),
      state('show', style({
        width: 320,
        height: '30px',
        backgroundColor: 'rgb(21, 34, 56)',
        color: 'rgb(255,255,255)'
      })),
      transition('hidden => show', animate(500,keyframes([
        style({width: '320px', height: '60px', backgroundColor: 'rgb(204, 110, 55)', color:'rgb(204, 110, 55)', offset:0.6}),
        style({width: '320px', height: '30px', backgroundColor: 'rgb(21, 34, 56)', color: 'rgb(255,255,255)', offset:1})
      ]))),
      transition('show => hidden', animate(500,keyframes([
        style({width: '320px', height: '60px', backgroundColor: 'rgb(204, 110, 55)', color: 'rgb(204, 110, 55)', offset:0.4}),
        style({width: '0px', height: '60px', backgroundColor: 'rgb(72, 198, 43)', color: 'rgb(72, 198, 43)', offset:1})
      ])))
    ]),
    trigger('content',[
      state('hidden', style({
        width: '350px',
        height: '0px',
        backgroundColor: 'rgb(240,240,240)'
      })),
      state('show', style({
        width: '350px',
        height: '400px',
        backgroundColor: 'rgb(240,240,240)',
        opacity: 0.93
      })),
      transition('hidden => show', animate('200ms 300ms ease-in-out')),
      transition('show => hidden', animate('200ms ease-in-out'))
    ])
  ]
})
export class FlashcardFormComponent{
  @Input() DeckName:  string;
  addButtonState:     string;
  front:              string;
  back:               string;
  message:            string;
  @Output() Flash  =  new  EventEmitter<any>();
  constructor(private deckService: DeckService){
    this.addButtonState = 'hidden';
    this.back = "";
    this.front= "";
    this.message="";
    this.DeckName="";
  }
  addButtonClick(){
    this.addButtonState = (this.addButtonState==='hidden')?this.addButtonState='show':this.addButtonState='hidden';
  }
  emitValue(value: any){
    this.Flash.emit(value);
  }
  addFlashcard(){
    this.deckService.addFlashcard(this.front, this.back, this.DeckName)
      .subscribe(data => {
        if(data["success"]){
          this.emitValue(data['flashcard']);
          this.front = "";
          this.back = "";
          this.message = data["message"];//deck created successfully
        }else{
          this.message= "there was a problem.";
        }
        setTimeout(myFunction, 1000, this);
      });
  }
}
function myFunction(theClass: any){
  theClass.addButtonClick();
  theClass.message = "";
}
