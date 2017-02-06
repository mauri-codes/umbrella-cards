import { Component } from '@angular/core';

import { LoginDetailsService }    from './users/login-details.service';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'html/app.component.html',
  styleUrls: ['styles/app.component.css'],
  providers: [LoginDetailsService]
})
export class AppComponent  {
  username:string;
  constructor(private loginService: LoginDetailsService){
    loginService.loginEmitted$.subscribe(user=> this.username = user);
    this.username = (localStorage.getItem('currentUser')+""== "null")?'':localStorage.getItem('currentUser');
  }
  logout(){
    console.log(localStorage.getItem('currentUser'));
    localStorage.setItem('currentUser', '');
    localStorage.setItem('token', '');
    this.username = '';
    console.log(localStorage.getItem('currentUser'));
  }
}
