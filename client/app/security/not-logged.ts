import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class NotLogged implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if(localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
