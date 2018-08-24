import { Component, OnInit } from '@angular/core';
import { UserService, UserStatus, User } from './user.service';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';

@Component({
    templateUrl: './user.component.html',
    styles: ['.spinner {font-size:35px; color:green;}']
})
export class UserComponent implements OnInit {

    public users: User[];
    public userLoadingStatus: UserLoadingStatus;
    public userForm: FormGroup;
    public formAction = 'Add';
    public confirming_deletion = false;
    public saving = false;

    constructor(private userService: UserService, private router: Router,
        private loginService: LoginService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.loadUsers();
        this.buildForm();
    }

    loadUsers() {
        this.userLoadingStatus = {status: 'loading'};
        this.userService.getUsers().subscribe((r: UserStatus) => {
            if (r.success) {
                this.users = r.users;
                this.userLoadingStatus = {status: this.users.length > 0 ? 'loaded' : 'empty'};
                return;
            }
            this.userLoadingStatus = {status: 'failed'};
            if (r.loggedOut) {
                this.loginService.doLogout();
                this.router.navigate(['/login']);
            }
        });
    }

    reset_form() {
        this.confirming_deletion = false;
        this.userForm.reset();
        this.formAction = 'Add';
    }

    edit_form(user_index: number) {
        this.confirming_deletion = false;
        this.userForm.reset();
        const selected_user = this.users[user_index];
        this.userForm.patchValue({
            url: selected_user.url,
            id: selected_user.id,
            email: selected_user.email,
            first_name: selected_user.first_name,
            last_name: selected_user.last_name
        });
        this.userForm.markAsTouched();
        this.formAction = 'Edit';
        return false;
    }

    save() {
        this.saving = true;
        this.confirming_deletion = false;
        if (!this.userForm.valid) { return; }
        if (this.userForm.value.id === null) { this.add_user(); return; }
        this.edit_user();
    }

    initiate_user_delete() {
        this.confirming_deletion = true;
        setTimeout(() => {
            this.confirming_deletion = false;
        }, 2000);
    }

    delete_user() {
        this.saving = true;
        this.confirming_deletion = false;
        const errorMessge = 'Failed to delete user. Please try again.';
        this.userService.deleteUser(this.userForm.value.url).subscribe( (r: UserStatus) =>
                                                    this.processUserStatus(r, errorMessge));
    }

    private add_user() {
        const newUser: User = {
            id: 0,
            username: this.userForm.value.email,
            first_name: this.userForm.value.first_name,
            last_name: this.userForm.value.last_name,
            email: this.userForm.value.email,
            password: this.userForm.value.password === null ? '' : this.userForm.value.password
        };
        const errorMessge = 'Failed to add user. Please try again.';
        this.userService.addUser(newUser).subscribe( (r: UserStatus) => this.processUserStatus(r, errorMessge));
    }

    private edit_user() {
        const user: User = {
            url: this.userForm.value.url,
            id: this.userForm.value.id,
            username: this.userForm.value.email,
            first_name: this.userForm.value.first_name,
            last_name: this.userForm.value.last_name,
            email: this.userForm.value.email,
            password: this.userForm.value.password === null ? '' : this.userForm.value.password
        };
        const errorMessge = 'Failed to edit user. Please try again.';
        this.userService.editUser(user).subscribe( (r: UserStatus) => this.processUserStatus(r, errorMessge));
    }

    private processUserStatus(r: UserStatus, errorMessge: string) {
        this.saving = false;
        if (r.success) {
            this.user_updated_successfully();
            return;
        }
        alert(errorMessge);
    }

    private user_updated_successfully() {
        this.userForm.reset();
        this.formAction = 'Add';
        this.loadUsers();
    }

    private buildForm() {
        this.userForm = this.fb.group({
            url: [null],
            id: [null],
            email: [null, Validators.compose([Validators.required, Validators.email])],
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],
            password: [null, (c: AbstractControl) => {
                if (c.value === null) { return null; }
                if (c.value.length === 0) { return null; }
                if (c.value.length > 5) { return null; }
                return {error: 'Min length violated.'};
            }]
        });
    }

}

export interface UserLoadingStatus {
    status: 'loaded' | 'empty' | 'loading' | 'failed';
}
