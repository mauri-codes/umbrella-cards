import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule }       from './app-routing.module';
import { AppComponent }           from './app.component';
import { WelcomeComponent}        from "./welcome.component";
import { NotFoundComponent}       from "./not-found.component";

import { UsersModule }           from './users/users.module';



@NgModule({
  imports:      [ BrowserModule,
                  UsersModule,
                  AppRoutingModule,
                  HttpModule,
                  FormsModule
  ],
  declarations: [ AppComponent,
                  NotFoundComponent,
                  WelcomeComponent,
  ],
  providers:    [ HttpModule ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
