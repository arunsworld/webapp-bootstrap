import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { UserService, UserStatus } from './user/user.service';

@Component({
    template: `
        <ab-bootstrap-navbar brand="Bootstrap App">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" routerLinkActive="active">
                    <a class="nav-link" routerLink="/home/users">Users</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="">{{myName}}</a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="" (click)="logout()">Logout</a>
                    </div>
                </li>
            </ul>
        </ab-bootstrap-navbar>
        <div class="container-fluid bodycontent">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: ['.bodycontent { padding-top: 80px; }']
})
export class HomeComponent implements OnInit {

    public myName: string;

    constructor(private loginService: LoginService, private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getSelf().subscribe( (r: UserStatus) => {
            if (r.success) {
                this.myName = r.users[0].first_name + ' ' + r.users[0].last_name;
                return;
            }
            if (r.loggedOut) {
                this.loginService.doLogout();
                this.router.navigate(['/login']);
            }
        });
    }

    public logout() {
        this.loginService.doLogout();
        this.router.navigate(['/login']);
        return false;
    }
}

