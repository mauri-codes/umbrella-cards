import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { Flashcard }      from './Flashcard';

import { DeckService }    from './deck-service';

@Component({
  moduleId: module.id,
  selector: 'deck-details',
  templateUrl: '../html/deck-detail.component.html',
  styleUrls: ['../styles/deck-detail.component.css'],
  providers: [ DeckService ]
})

export class DeckDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService
  ){
    this.flashcardsLength = 0;
  }
  message: string;
  flashcardsLength: number;
  flashcards: Flashcard[];
  ngOnInit():void{
    //+"" with currentUser or guard the route, otherwise the server might get a null value
    this.route.params
      .switchMap((params: Params) => this.deckService.getFlashcards(params['deck'], localStorage.getItem('currentUser')))
      .subscribe(data => {
          if(data['success']) {
            this.flashcards = data['flashcards'] as Flashcard[];
            this.flashcardsLength = this.flashcards.length;
            if(this.flashcardsLength == 0){ this.message = "You don't have flashcards yet. Try creating one"}
          }else{
            this.message = data['message'];
          }
      });
  }
}
