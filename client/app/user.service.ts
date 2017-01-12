import { Injectable } from '@angular/core';

import { User }       from './User';
import { Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService{
  private usersUrl = 'http://localhost:3000/getusers';

  constructor(private http: Http) { }
  getUsers(): Observable<User[]>{
    return this.http.get(this.usersUrl).map((r:Response) => r.json() as User[]);
  }
}
