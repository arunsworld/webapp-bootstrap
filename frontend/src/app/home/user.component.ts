import { Component, OnInit } from '@angular/core';
import { UserService, UserStatus, User } from './user.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
    template: `
        <p>Users</p>
        <ol>
            <li *ngFor="let user of users">{{user.username}}</li>
        </ol>
    `,
    styles: []
})
export class UserComponent implements OnInit {

    users: User[];

    constructor(private userService: UserService, private router: Router, private loginService: LoginService) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    private loadUsers() {
        this.userService.getUsers().subscribe((r: UserStatus) => {
            if (r.success) {
                this.users = r.users;
                return;
            }
            if (r.loggedOut) {
                this.loginService.doLogout();
                this.router.navigate(['/login']);
            }
        });
    }

}
