import { Component, OnInit } from '@angular/core';
import { UserService, UserStatus, User } from './user.service';

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

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.loadUsers();
        setTimeout(() => {
            this.loadUsers();
        }, 7000);
    }

    private loadUsers() {
        this.userService.getUsers().subscribe((r: UserStatus) => {
            if (!r.running) {
                if (r.success) {
                    this.users = r.users;
                    console.log('done loading users...');
                } else {
                    alert('Could not load users...: ' + r.failure_reason);
                }
            }
        });
    }

}
