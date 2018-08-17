import { Component } from '@angular/core';
import { LoginCredentials } from 'projects/library/src/public_api';
import { Router } from '@angular/router';
import { LoginService, LoginCallStatus } from './login.service';

@Component({
  template: `
    <div class="bodycontent">
      <div *ngIf="loggedInCheck">
        <ab-loading headerMessage="Checking if logged in..."></ab-loading>
      </div>
      <div *ngIf="!loggedInCheck">
        <ab-bootstrap-login [loggingIn]="loggingIn" (login)="do_login($event)"></ab-bootstrap-login>
        <div *ngIf="creds">
            <br/>
            <hr/>
            <div class="row justify-content-center">
                <div class="col-sm-6">
                    <p>Logging in with: {{ creds | json }}</p>
                </div>
            </div>
            <hr/>
        </div>
      </div>
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
        this.router.navigate(['/demo']);
      }
      this.loggedInCheck = true;
      this.checkIfLoggedIn();
    }

    do_login(creds: LoginCredentials) {
        this.loggingIn = true;
        this.creds = creds;
        this.loginService.doLogin(creds).subscribe((status: LoginCallStatus) => {
          if (!status.running) {
            this.doLoginDone(status);
            this.loggingIn = false;
          }
        });
    }

    private checkIfLoggedIn() {
      this.loginService.checkIfLoggedIn().subscribe((status: LoginCallStatus) => {
        if (!status.running) {
          this.checkLoginDone(status);
        }
      });
    }

    private checkLoginDone(status: LoginCallStatus) {
      if (!status.success) {
        this.checkLoginFailed(status);
        return;
      }
      this.checkLoginSuccessful(status);
    }

    private doLoginDone(status: LoginCallStatus) {
      if (!status.success) {
        this.doLoginFailed(status);
        return;
      }
      this.doLoginSuccessful(status);
    }

    private doLoginSuccessful(status: LoginCallStatus) {
      if (!status.loggedIn) {
        alert('Login failed...');
        return;
      }
      this.router.navigate(['/demo']);
    }

    private checkLoginSuccessful(status: LoginCallStatus) {
      if (status.loggedIn) {
        this.router.navigate(['/demo']);
      }
      this.loggedInCheck = false;
    }

    private doLoginFailed(status: LoginCallStatus) {
      alert('Failed to reach server. Please try again...');
    }

    private checkLoginFailed(status: LoginCallStatus) {
      alert('Failed to reach server. Please refresh the page...');
    }

}
