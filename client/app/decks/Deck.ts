export class Deck {
  deckName:     string;
  id:           string;
  owner:        string;
  createdAt:    string;
  flashcards:   number;
  constructor(dn: string, ow: string, fc: number){
    this.deckName       = dn;
    this.owner          = ow;
    this.flashcards     = fc;
  }
}
