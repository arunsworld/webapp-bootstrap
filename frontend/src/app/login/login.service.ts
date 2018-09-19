import { Injectable } from '@angular/core';
import { LoginCredentials } from 'projects/library/public_api';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { LocalStorage, LocalStorageService } from 'ngx-store';


export abstract class LoginService {

  public loggedIn = false;
  @LocalStorage() access_token = '';
  private nextUrl = '/';

  constructor() { }

  public abstract doLogin(creds: LoginCredentials): Observable<LoginCallStatus>;
  public abstract checkIfLoggedIn(): Observable<LoginCallStatus>;
  public abstract doLogout();
  public abstract authHeader(): {Authorization: string};
  public setNextUrl(url: string) { this.nextUrl = url; }
  public getNextUrl() { return this.nextUrl; }

}


@Injectable({
  providedIn: 'root'
})
export class TestAPILoginService extends LoginService {

  public root_url = 'http://localhost:8091/';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    super();
    // this.dumpLocalStorage();
  }

  public doLogin(creds: LoginCredentials): Observable<LoginCallStatus> {
    const url = this.root_url + 'auth/token/obtain/';
    return this.http.post(url, {username: creds.email, password: creds.password}).pipe(
      map( (res: AuthToken) => {
        if (!res.access) {
          return { running: false, success: true, loggedIn: false};
        }
        this.access_token = res.access;
        this.loggedIn = true;
        return { running: false, success: true, loggedIn: true};
      }),
      catchError( (err: HttpErrorResponse) => {
        if (err.status === 400) {
          return of({ running: false, success: true, loggedIn: false});
        }
        return of({ running: false, success: false, loggedIn: false});
      })
    );
  }

  public checkIfLoggedIn(): Observable<LoginCallStatus> {
    if (this.access_token === '') {
      return of({ running: false, success: true, loggedIn: false});
    }
    const url = this.root_url + 'auth/token/verify/';
    return this.http.post(url, {token: this.access_token}).pipe(
      map(res => {
        this.loggedIn = true;
        return {running: false, success: true, loggedIn: true};
      }),
      catchError( (err: HttpErrorResponse) => {
        if (err.status === 401) {
          return of({ running: false, success: true, loggedIn: false});
        }
        return of({ running: false, success: false, loggedIn: false});
      })
    );
  }

  public doLogout() {
    this.localStorageService.clear('all');
    this.access_token = '';
    this.loggedIn = false;
    return false;
  }

  public authHeader() {
    return {Authorization: 'Bearer ' + this.access_token };
  }

  private dumpLocalStorage() {
    this.localStorageService.keys.forEach((key) => {
      console.log(key + ' =', this.localStorageService.get(key));
    });
  }

}

@Injectable({
  providedIn: 'root'
})
export class APILoginService extends TestAPILoginService {

  public root_url = '/api/';

}


export interface LoginCallStatus {
  success?: boolean;
  failure_reason?: string;
  loggedIn?: boolean;
}

export interface AuthToken {
  refresh: string;
  access: string;
}
