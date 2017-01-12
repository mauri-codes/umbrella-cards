import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule }       from './app-routing.module';
import { AppComponent }  from './app.component';
import { WelcomeComponent}       from "./welcome.component";
import { UsersComponent}         from "./users.component";
import { NotFoundComponent}      from "./not-found.component";
import { UserListComponent }     from './user-list.component'


@NgModule({
  imports:      [ BrowserModule,
                  AppRoutingModule,
                  HttpModule],
  declarations: [ AppComponent,
    UsersComponent,
    UserListComponent,
    NotFoundComponent,
    WelcomeComponent],
  providers: [HttpModule],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
