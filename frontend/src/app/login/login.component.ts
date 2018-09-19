import { Component } from '@angular/core';
import { LoginCredentials } from 'projects/library/public_api';
import { Router } from '@angular/router';
import { LoginService, LoginCallStatus } from './login.service';

@Component({
  template: `
    <div class="container-fluid bodycontent">
      <div *ngIf="serverUnreachable; else serverIsAvailable">
        <ab-bootstrap-card header="Server unreachable">
          <p>The server is currently unreachable.</p>
          <p>
            <button class="btn btn-primary" type="button" (click)="checkIfLoggedIn()">Retry</button>
          </p>
        </ab-bootstrap-card>
      </div>
      <ng-template #serverIsAvailable>
        <div *ngIf="loggedInCheck; else showLogin">
          <ab-loading headerMessage="Checking if logged in..."></ab-loading>
        </div>
        <ng-template #showLogin>
          <ab-bootstrap-login [focusOnLoginID]="false" [loggingIn]="loggingIn" (login)="do_login($event)"></ab-bootstrap-login>
        </ng-template>
      </ng-template>
      <br/>
      <ab-bootstrap-card header="Component Library">
        <p>Click <a routerLink="/demo">here</a> to see a demonstration of the Component Library.</p>
      </ab-bootstrap-card>
    </div>
  `,
  styles: ['.bodycontent { padding-top: 80px; }']
})
export class LoginComponent {

    creds: LoginCredentials;
    loggedInCheck: boolean;
    loggingIn = false;
    serverUnreachable = false;

    constructor(private router: Router, private loginService: LoginService) {
      if (loginService.loggedIn) {
        this.router.navigateByUrl(this.loginService.getNextUrl());
      }
      this.checkIfLoggedIn();
    }

    do_login(creds: LoginCredentials) {
        this.loggingIn = true;
        this.creds = creds;
        this.loginService.doLogin(creds).subscribe((status: LoginCallStatus) => {
          this.doLoginDone(status);
          this.loggingIn = false;
        });
    }

    private checkIfLoggedIn() {
      this.loggedInCheck = true;
      this.loginService.checkIfLoggedIn().subscribe((status: LoginCallStatus) => {
        this.checkLoginDone(status);
      });
    }

    private checkLoginDone(status: LoginCallStatus) {
      if (!status.success) {
        this.failedToReachServer();
        return;
      }
      this.checkLoginSuccessful(status);
      this.serverUnreachable = false;
    }

    private doLoginDone(status: LoginCallStatus) {
      if (!status.success) {
        this.failedToReachServer();
        return;
      }
      this.doLoginSuccessful(status);
      this.serverUnreachable = false;
    }

    private doLoginSuccessful(status: LoginCallStatus) {
      if (!status.loggedIn) {
        alert('Login failed...');
        return;
      }
      this.router.navigateByUrl(this.loginService.getNextUrl());
    }

    private checkLoginSuccessful(status: LoginCallStatus) {
      if (status.loggedIn) {
        this.router.navigateByUrl(this.loginService.getNextUrl());
      }
      this.loggedInCheck = false;
    }

    private failedToReachServer() {
      this.serverUnreachable = true;
    }

}
