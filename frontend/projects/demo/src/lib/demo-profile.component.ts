import { Component } from '@angular/core';

@Component({
  selector: 'ab-profile-nav',
  template: `
    <ul class="navbar-nav">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown">Arun Barua</a>
            <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" routerLink="/login" routerLinkActive="active">Login</a>
                <a class="dropdown-item" routerLink="/demo/forms" routerLinkActive="active">Forms</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item">Logout</a>
            </div>
        </li>
    </ul>
  `,
  styles: []
})
export class DemoProfileComponent { }
