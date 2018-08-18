import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginService, LoginCallStatus } from '../login/login.service';


export abstract class UserService {

    public abstract getUsers(): Observable<UserStatus>;
    public abstract addUser(): Observable<UserStatus>;
    public abstract deleteUser(): Observable<UserStatus>;

}

@Injectable({
    providedIn: 'root'
})
export class TestAPIUserService extends UserService {

    public root_url = 'http://localhost:8091/';

    constructor(private http: HttpClient, private loginService: LoginService) {
        super();
    }

    public getUsers(): Observable<UserStatus> {
        const start_event: UserStatus = { running: true };
        const user_status = new BehaviorSubject<UserStatus>(start_event);
        const url = this.root_url + 'users/';
        const auth = 'Bearer ' + this.loginService.access_token;
        this.http.get(url, {headers: {Authorization: auth}}).subscribe(
            (d: User[]) => {
                const end_event: UserStatus = {running: false, success: true, users: d};
                user_status.next(end_event);
                user_status.complete();
            },
            (e: HttpErrorResponse) => {
                const end_event: UserStatus = {running: false, success: false };
                if (e.status === 401) {
                    end_event.failure_reason = 'Permission denied.';
                } else {
                    end_event.failure_reason = 'Could not connect to server.';
                }
                user_status.next(end_event);
                user_status.complete();
            }
        );
        return user_status.asObservable();
    }

    public addUser(): Observable<UserStatus> {
        const start_event: UserStatus = { running: true };
        const login_status = new BehaviorSubject<UserStatus>(start_event);
        return login_status.asObservable();
    }

    public deleteUser(): Observable<UserStatus> {
        const start_event: UserStatus = { running: true };
        const login_status = new BehaviorSubject<UserStatus>(start_event);
        return login_status.asObservable();
    }

}

@Injectable({
    providedIn: 'root'
})
export class APIUserService extends TestAPIUserService {

    public root_url = '/api/';

}


export interface User {
    url?: string;
    id: number;
    username: string;
    first_name?: string;
    last_name?: string;
    email: string;
    password?: string;
}

export interface UserStatus {
    running: boolean;
    success?: boolean;
    failure_reason?: string;
    users?: User[];
}

