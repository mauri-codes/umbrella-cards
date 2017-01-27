import { Injectable } from '@angular/core';

import { User }       from './User';
import { Headers, Http, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService{

  constructor(private http: Http) { }
  getUsers(): Observable<User[]>{
    return this.http.get("/getusers").map((r:Response) => r.json() as User[]);
  }
  getUser(username: string){
    return this.http.get("/getuser/"+username).map((r:Response) => r.json());
  }
  getUser2(username: string){
    return "hi world";
  }
  newUser(newuser: User):Observable<User>{
    // some examples added options as a third parameter for post request,
    // just in case, here they are
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    let data = JSON.parse(JSON.stringify(newuser)); //converts to string and then to JSON
    return this.http.post('/signup', data).map((r:Response) => r.json());
  }
  deleteUser(x:string): Observable<User>{
    return this.http.post('/deleteuser', {username: x}).map(( r : Response ) => r.json() );
  }
}
