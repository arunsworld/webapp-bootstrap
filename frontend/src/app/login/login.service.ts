import { Injectable } from '@angular/core';
import { LoginCredentials } from 'projects/library/src/public_api';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


export abstract class LoginService {

  loggedIn = false;
  public access_token: string;

  constructor() { }

  public abstract doLogin(creds: LoginCredentials): Observable<LoginCallStatus>;
  public abstract checkIfLoggedIn(): Observable<LoginCallStatus>;
  public abstract refreshAccessToken(status: BehaviorSubject<LoginCallStatus> | Subject<LoginCallStatus>);

}


@Injectable({
  providedIn: 'root'
})
export class TestAPILoginService extends LoginService {

  root_url = 'http://localhost:8091/';
  public access_token: string;
  private refresh_token: string;
  public loggedIn = false;

  constructor(private http: HttpClient) {
    super();
  }

  public doLogin(creds: LoginCredentials): Observable<LoginCallStatus> {
    const start_event: LoginCallStatus = { running: true };
    const login_status = new BehaviorSubject<LoginCallStatus>(start_event);
    const url = this.root_url + 'auth/token/obtain/';
    this.http.post(url, {username: creds.email, password: creds.password}).subscribe(
      (d: any) => {
        this.access_token = d.access;
        this.refresh_token = d.refresh;
        this.loggedIn = true;
        const end_event: LoginCallStatus = { running: false, success: true, loggedIn: true};
        login_status.next(end_event);
        login_status.complete();
      },
      (e: HttpErrorResponse) => {
        this.loggedIn = false;
        const end_event: LoginCallStatus = { running: false, success: true, loggedIn: false};
        if (e.status === 400) {
          login_status.next(end_event);
          login_status.complete();
          return;
        }
        end_event.success = false;
        login_status.next(end_event);
        login_status.complete();
      }
    );
    return login_status.asObservable();
  }

  public checkIfLoggedIn(): Observable<LoginCallStatus> {
    const start_event: LoginCallStatus = { running: true };
    const login_status = new BehaviorSubject<LoginCallStatus>(start_event);
    if (!this.access_token) {
      setTimeout(() => {
        const end_event: LoginCallStatus = { running: false, success: true, loggedIn: false};
        login_status.next(end_event);
        login_status.complete();
      }, 0);
    } else {
      this.validateAccessToken(login_status);
    }
    return login_status.asObservable();
  }

  public refreshAccessToken(status: BehaviorSubject<LoginCallStatus> | Subject<LoginCallStatus>) {
    this.loggedIn = false;
    if (!this.refresh_token) {
      const end_event: LoginCallStatus = { running: false, success: true, loggedIn: false};
      status.next(end_event);
      status.complete();
      return;
    }
    const url = this.root_url + 'auth/token/refresh/';
    this.http.post(url, {refresh: this.refresh_token}).subscribe(
      (d: any) => {
        this.loggedIn = true;
        this.access_token = d.access;
        const end_event: LoginCallStatus = { running: false, success: true, loggedIn: true};
        status.next(end_event);
        status.complete();
      },
      e => {
        if (e.status === 401) {
          this.refresh_token = null;
          const end_event: LoginCallStatus = { running: false, success: true, loggedIn: false};
          status.next(end_event);
          status.complete();
        } else {
          console.log(e);
          const end_event: LoginCallStatus = { running: false, success: false, loggedIn: false};
          status.next(end_event);
          status.complete();
        }
      }
    );
  }

  private validateAccessToken(status: BehaviorSubject<LoginCallStatus>) {
    const url = this.root_url + 'auth/token/verify/';
    this.http.post(url, {token: this.access_token}).subscribe(
      d => {
        this.loggedIn = true;
        const end_event: LoginCallStatus = { running: false, success: true, loggedIn: true};
        status.next(end_event);
        status.complete();
      },
      e => {
        this.loggedIn = false;
        if (e.status === 401) {
          this.access_token = null;
          this.refreshAccessToken(status);
        } else {
          console.log(e);
          const end_event: LoginCallStatus = { running: false, success: false, loggedIn: false};
          status.next(end_event);
          status.complete();
        }
      }
    );
  }

}

@Injectable({
  providedIn: 'root'
})
export class APILoginService extends TestAPILoginService {

  public root_url = '/api/';

}


@Injectable({
  providedIn: 'root'
})
export class MockLoginService extends LoginService {

  doLogin(creds: LoginCredentials): Observable<LoginCallStatus> {
    const start_event: LoginCallStatus = { running: true };
    const login_status = new BehaviorSubject<LoginCallStatus>(start_event);
    setTimeout(() => {
      this.loggedIn = true;
      const end_event: LoginCallStatus = { running: false, success: true, loggedIn: this.loggedIn};
      login_status.next(end_event);
      login_status.complete();
    }, 500);
    return login_status.asObservable();
  }

  checkIfLoggedIn(): Observable<LoginCallStatus> {
    const start_event: LoginCallStatus = { running: true };
    const login_status = new BehaviorSubject<LoginCallStatus>(start_event);
    setTimeout(() => {
      const end_event: LoginCallStatus = { running: false, success: true, loggedIn: this.loggedIn};
      login_status.next(end_event);
      login_status.complete();
    }, 200);
    return login_status.asObservable();
  }

  public refreshAccessToken(status: BehaviorSubject<LoginCallStatus>) {
    return null;
  }

}


export interface LoginCallStatus {
  running: boolean;
  success?: boolean;
  failure_reason?: string;
  loggedIn?: boolean;
}
