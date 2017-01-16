import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'

import { AppRoutingModule }       from './app-routing.module';
import { AppComponent }  from './app.component';
import { WelcomeComponent}       from "./welcome.component";
import { UsersComponent}         from "./users.component";
import { NotFoundComponent}      from "./not-found.component";
import { UserListComponent }     from './user-list.component'
import { UserFormComponent }     from './user-form.component';



@NgModule({
  imports:      [ BrowserModule,
                  AppRoutingModule,
                  HttpModule,
                  FormsModule],
  declarations: [ AppComponent,
                  UsersComponent,
                  UserListComponent,
                  NotFoundComponent,
                  WelcomeComponent,
                  UserFormComponent],
  providers: [HttpModule],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
