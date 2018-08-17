import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LibraryModule, RouteReuseStrategyService } from 'projects/library/src/public_api';
import { DemoModule } from 'projects/demo/src/public_api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './ab-root/app.component';

import { RouteReuseStrategy } from '@angular/router';

import 'moment-duration-format';
import { LoginComponent } from './login/login.component';
import { LoginService, MockLoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    LibraryModule,
    DemoModule,
    AppRoutingModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: RouteReuseStrategyService},
    {provide: LoginService, useClass: MockLoginService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
