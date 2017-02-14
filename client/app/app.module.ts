import { NgModule }               from '@angular/core';
import { HttpModule }             from '@angular/http';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule }            from '@angular/forms';

import { AppRoutingModule }       from './app-routing.module';
import { AppComponent }           from './app.component';
import { WelcomeComponent}        from "./welcome.component";
import { NotFoundComponent}       from "./not-found.component";

import { DecksModule }            from "./decks/decks.module";
import { UsersModule }            from './users/users.module';
import { AuthGuard }              from "./security/auth.guard";
import { NotLogged }              from "./security/not-logged";
import { AdminGuard }             from "./security/admin.guard";



@NgModule({
  imports:      [ BrowserModule,
                  UsersModule,
                  DecksModule,
                  AppRoutingModule,
                  HttpModule,
                  FormsModule
  ],
  declarations: [ AppComponent,
                  NotFoundComponent,
                  WelcomeComponent,
  ],
  providers:    [ HttpModule,
                  AuthGuard,
                  NotLogged,
                  AdminGuard],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
