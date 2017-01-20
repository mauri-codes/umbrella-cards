import { Component }        from '@angular/core';

import { User }             from './User';
import { UserService }      from './user.service';


@Component({
  moduleId: module.id,
  selector: 'user-form',
  templateUrl: '../html/user-form.component.html',
  providers: [ UserService ],
  styleUrls: ['../styles/forms.css']
})
export class UserFormComponent {
  userService: UserService;
  username = '';
  email = '';
  password = '';
  response = 'response';  // the message to display after hitting submit
  constructor(uService: UserService){
    this.userService = uService;
  }
  newUser(){
    var newuser = new User(this.username, this.email, this.password);
    var successMessage = "Your account was successfully created," +
      " check your email to verify your account.";
    var errorMessage   = "There was an error in the process, " +
      "please try again later.";
    var userInUse      = "Username already taken.";
    var emailInUse     = "This email has an account already.";
    var redirect       = " You will be redirected in 5 seconds to ";
    var address = "/sign-up";
    this.userService.newUser(newuser)
      .subscribe(data =>
        { if(data["response"] == "success"){
          this.response = successMessage + redirect + "the main page";
          address = "/";
        } else if(data["error"] == "user already exists"){
          this.response = userInUse + redirect + "the form";
        } else if(data["error"] == "email in use"){
          this.response = emailInUse + redirect + "the form";
        } else {
          this.response = errorMessage + redirect + "the form";
        }
          setTimeout(function () { window.location.href = address; }, 5000);
        },
        err =>
        { this.response = errorMessage; });
  }
}
