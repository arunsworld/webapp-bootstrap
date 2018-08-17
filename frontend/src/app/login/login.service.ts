import { Injectable } from '@angular/core';
import { LoginCredentials } from 'projects/library/src/public_api';
import { Observable, BehaviorSubject } from 'rxjs';


export abstract class LoginService {

  loggedIn = false;

  constructor() { }

  public abstract doLogin(creds: LoginCredentials): Observable<LoginCallStatus>;
  public abstract checkIfLoggedIn(): Observable<LoginCallStatus>;

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

}


export interface LoginCallStatus {
  running: boolean;
  success?: boolean;
  failure_reason?: string;
  loggedIn?: boolean;
}
