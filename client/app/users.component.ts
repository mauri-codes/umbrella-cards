import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'user',
  providers: [ UserService ],
  templateUrl: './html/users.component.html'
})

export class UsersComponent {

}
