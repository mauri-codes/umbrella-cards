import { Component }      from '@angular/core';
import { UserService }    from './user.service';
import { User }           from './User';

@Component({
  moduleId: module.id,
  selector: 'user-list',
  templateUrl: './html/user-list.component.html',
  styleUrls: ['styles/tables.css', 'styles/styles.css']
})

export class UserListComponent{
  users: User[];
  constructor(userService: UserService){
    userService.getUsers().subscribe(users => {this.users = users; this.convert();}, err => console.log (err) );
  }
  deleteUser(){
    window.location.href = "/";
  }
  deleteUser2(){
    window.location.href = "/users";
  }
  //convert the date to something more readable
  convert(){
    this.users.forEach(function (e) {
      var date = new Date(e.createdAt);
      e.createdAt = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
    });
  }
}

