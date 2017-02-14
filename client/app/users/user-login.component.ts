import { Component, EventEmitter, Input, Output }      from '@angular/core';
import { Router }                                      from '@angular/router';

import { UserService }    from './user.service';
import {LoginDetailsService} from './login-details.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: '../html/user-login.component.html',
  providers: [ UserService ],
  styleUrls: ['../styles/forms.css']
})

export class UserLoginComponent {
  username = "";
  password = "";
  constructor(
    private userService: UserService,
    private loginService: LoginDetailsService,
    private router: Router
  ){}
  login(){
    this.userService.login(this.username, this.password).subscribe(data=>{
      if(data['success']){
        localStorage.setItem('token', data['token']);
        localStorage.setItem('currentUser', this.username);
        localStorage.setItem('role', data['role']);
        this.loginService.emitChange({username: this.username, role: data['role']});
        this.router.navigate(['/']);
      }else{
        console.log(data['message']);
      }
    })
  }
}
