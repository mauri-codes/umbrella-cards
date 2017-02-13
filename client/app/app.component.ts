import {
  Component, trigger,
  state, style,
  transition, animate, keyframes
}  from '@angular/core';

import { LoginDetailsService }    from './users/login-details.service';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'html/app.component.html',
  styleUrls: ['styles/app.component.css'],
  providers: [LoginDetailsService],
  animations: [
    trigger('navchild',[
      state('none', style({})),
      state('appear', style({
        transform: 'rotateY(0deg) translate(0px)'
      })),
      state('appear2', style({
        transform: 'rotateY(0deg) translate(0px)'
      })),
      state('appear3', style({
        transform: 'rotateY(0deg) translate(0px)'
      })),
      state('appear4', style({
        transform: 'rotateY(0deg) translate(0px)'
      })),
      transition('none <=> appear', animate("150ms ease-in",keyframes([
        style({transform: 'rotateY(-90deg) translate(30px)', offset:0}),
        style({transform: 'rotateY(0deg) translate(0px)', offset:1})
      ]))),
      transition('none <=> appear2', animate("150ms 50ms ease-in",keyframes([
        style({transform: 'rotateY(-90deg) translate(30px)', offset:0}),
        style({transform: 'rotateY(0deg) translate(0px)', offset:1})
      ]))),
      transition('none <=> appear3', animate("150ms 100ms ease-in",keyframes([
        style({transform: 'rotateY(-90deg) translate(30px)', offset:0}),
        style({transform: 'rotateY(0deg) translate(0px)', offset:1})
      ]))),
      transition('none <=> appear4', animate("150ms 150ms ease-in",keyframes([
        style({transform: 'rotateY(-90deg) translate(30px)', offset:0}),
        style({transform: 'rotateY(0deg) translate(0px)', offset:1})
      ])))
    ])
  ]
})
export class AppComponent  {
  time:number = 300;
  state4:string = 'none';
  state2:string = 'none';
  state3:string = 'none';
  state:string = 'none';
  username:string;
  role: string;
  constructor(private loginService: LoginDetailsService){
    loginService.loginEmitted$.subscribe(user=> {this.username = user.username; this.role = user.role;});
    this.username = (localStorage.getItem('currentUser')+""== "null")?'':localStorage.getItem('currentUser');
    this.role = (localStorage.getItem('role')+"" == "null")? '': localStorage.getItem('role');
  }
  //for animation
  toggleState(){
    if(this.state === 'none'){
      this.state = 'appear';
      this.state2 = 'appear2';
      this.state3 = 'appear3';
      this.state4 = 'appear4';
    }
    else{
      this.state = 'none';
      this.state2 = 'none';
      this.state3 = 'none';
      this.state4 = 'none';
    }
  }
  logout(){
    localStorage.setItem('currentUser', '');
    localStorage.setItem('token', '');
    this.username = '';
  }
}
