export class Flashcard {
  front:        string;
  back:         string;
  createdAt:    string;
  _id:           string;
  constructor(front: string, back: string, id: string){
    this.front =  front;
    this.back =   back;
    this._id =     id;
  }
}
