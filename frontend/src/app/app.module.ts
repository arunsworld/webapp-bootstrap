import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LibraryModule, RouteReuseStrategyService } from 'projects/library/public_api';
import { DemoModule } from 'projects/demo/public_api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './ab-root/app.component';

import { RouteReuseStrategy } from '@angular/router';

import 'moment-duration-format';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './home/user/user.component';
import { UserService } from './home/user/user.service';
import { environment } from '../environments/environment';
import { WebStorageModule } from 'ngx-store';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    LibraryModule,
    DemoModule,
    AppRoutingModule,
    HttpClientModule,
    WebStorageModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: RouteReuseStrategyService},
    {provide: LoginService, useClass: environment.loginService},
    {provide: UserService, useClass: environment.userService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
