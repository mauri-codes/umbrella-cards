import { Component }      from '@angular/core';
import { UserService }    from './user.service';
import { User }           from './User';

@Component({
  moduleId: module.id,
  selector: 'user-list',
  templateUrl: './html/user-list.component.html'
})

export class UserListComponent{
  users: User[];
  constructor(userService: UserService){
    userService.getUsers().subscribe(users => this.users = users, err => console.log (err) );
  }
}
