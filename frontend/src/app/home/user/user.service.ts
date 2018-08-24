import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginService, LoginCallStatus } from '../../login/login.service';
import { map, catchError } from 'rxjs/operators';


export abstract class UserService {

    public abstract getSelf(): Observable<UserStatus>;
    public abstract getUsers(): Observable<UserStatus>;
    public abstract addUser(user: User): Observable<UserStatus>;
    public abstract editUser(user: User): Observable<UserStatus>;
    public abstract deleteUser(url: string): Observable<UserStatus>;

}

@Injectable({
    providedIn: 'root'
})
export class TestAPIUserService extends UserService {

    public root_url = 'http://localhost:8091/';

    constructor(private http: HttpClient, private loginService: LoginService) {
        super();
    }

    public getSelf(): Observable<UserStatus> {
        const url = this.root_url + 'user/';
        return this.http.get(url, {headers: this.loginService.authHeader()}).pipe(
            map( (user: User) => {
                return {success: true, users: [user]};
            } ),
            catchError( (err: HttpErrorResponse) => {
                if (err.status === 401) {
                  return of({ success: false, loggedOut: true });
                }
                return of({ success: false });
            })
        );
    }

    public getUsers(): Observable<UserStatus> {
        const url = this.root_url + 'users/';
        return this.http.get(url).pipe(
            map( (users: User[]) => {
                return {success: true, users: users};
            } ),
            catchError( (err: HttpErrorResponse) => {
                if (err.status === 401) {
                    return of({ success: false, loggedOut: true });
                }
                return of({ success: false });
            })
        );
    }

    public addUser(user: User): Observable<UserStatus> {
        const url = this.root_url + 'users/';
        return this.http.post(url, user, {headers: this.loginService.authHeader()}).pipe(
            map( () => ({success: true}) ),
            catchError( (err: HttpErrorResponse) => {
                console.log(err);
                return of({ success: false });
            })
        );
    }

    public editUser(user: User): Observable<UserStatus> {
        const url = user.url;
        return this.http.put(url, user, {headers: this.loginService.authHeader()}).pipe(
            map( () => ({success: true}) ),
            catchError( (err: HttpErrorResponse) => {
                console.log(err);
                return of({ success: false });
            })
        );
    }

    public deleteUser(url: string): Observable<UserStatus> {
        return this.http.delete(url, {headers: this.loginService.authHeader()}).pipe(
            map( () => ({success: true}) ),
            catchError( (err: HttpErrorResponse) => {
                console.log(err);
                return of({ success: false });
            })
        );
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
    success: boolean;
    loggedOut?: boolean;
    failure_reason?: string;
    users?: User[];
}

