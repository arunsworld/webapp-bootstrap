import { Component } from '@angular/core';
import { LoginCredentials } from 'projects/library/src/public_api';
import { Router } from '@angular/router';
import { LoginService, LoginCallStatus } from './login.service';

@Component({
  template: `
    <div class="bodycontent">
      <div *ngIf="loggedInCheck; else showLogin">
        <ab-loading headerMessage="Checking if logged in..."></ab-loading>
      </div>
      <ng-template #showLogin>
        <ab-bootstrap-login [loggingIn]="loggingIn" (login)="do_login($event)"></ab-bootstrap-login>
      </ng-template>
    </div>
  `,
  styles: ['.bodycontent { padding-top: 80px; }']
})
export class LoginComponent {

    creds: LoginCredentials;
    loggedInCheck: boolean;
    loggingIn = false;

    constructor(private router: Router, private loginService: LoginService) {
      if (loginService.loggedIn) {
        this.router.navigateByUrl(this.loginService.getNextUrl());
      }
      this.loggedInCheck = true;
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
    }

    private doLoginDone(status: LoginCallStatus) {
      if (!status.success) {
        this.failedToReachServer();
        return;
      }
      this.doLoginSuccessful(status);
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
      alert('Failed to reach server. Please refresh the page...');
    }

}
