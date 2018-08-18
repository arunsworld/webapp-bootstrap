import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
    template: `
        <ab-bootstrap-navbar brand="Bootstrap App">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" routerLinkActive="active">
                    <a class="nav-link" routerLink="/home/users">Users</a>
                </li>
            </ul>
        </ab-bootstrap-navbar>
        <div class="container-fluid bodycontent">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: ['.bodycontent { padding-top: 80px; }']
})
export class HomeComponent {

    constructor() { }
}

