import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { UserService }              from './user.service';
import { User }                     from './User';
import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'user-detail',
  providers: [ UserService ],
  templateUrl: "../html/user-detail.component.html"
})
export class UserDetailComponent implements OnInit{
  user: User;
  ngOnInit():void{
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['username']))
      .subscribe(data => {
        if(data.response == "error")
          console.log(data.error);
        else
          this.user = data.user});
  }
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ){

  }
}
