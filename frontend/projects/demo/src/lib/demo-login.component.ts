import { Component } from '@angular/core';
import { LoginCredentials } from '../../../library/src/public_api';

@Component({
  template: `
    <ab-bootstrap-login (login)="do_login($event)"></ab-bootstrap-login>
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
  `,
  styles: []
})
export class DemoLoginComponent {

    creds: LoginCredentials;

    do_login(creds: LoginCredentials) {
        this.creds = creds;
    }

}
