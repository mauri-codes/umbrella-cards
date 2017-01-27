import { Component }      from '@angular/core';
import { Router }         from '@angular/router';

import { UserService }    from './user.service';
import { User }           from './User';

@Component({
  moduleId: module.id,
  selector: 'user-list',
  templateUrl: '../html/user-list.component.html',
  styleUrls: ['../styles/tables.css', '../styles/styles.css']
})

export class UserListComponent{
  users: User[];
  constructor(private userService: UserService, private router:Router){
    this.userService.getUsers().subscribe(users => {this.users = users; this.convert();}, err => console.log (err) );
  }
  onSelect(username: string){
    this.router.navigate(['/user', username]);
  }
  deleteUser(x:string, index:number){
    this.userService.deleteUser(x)
      .subscribe(data => {
        if(data["response"] == "success"){
          this.users.splice(index,1);
        }else{
          console.log(data["error"]);
        }
      }, err => console.log (err) );
  }
  //convert the date to something more readable
  convert(){
    this.users.forEach(function (e) {
      var date = new Date(e.createdAt);
      e.createdAt = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
    });
  }
}

