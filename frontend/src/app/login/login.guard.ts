import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { SharedStorage } from 'ngx-store';

@Injectable({
    providedIn: 'root'
})
export class LoginRouteGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.loginService.loggedIn) { return true; }
        this.loginService.setNextUrl(state.url);
        this.router.navigate(['/login']);
    }
}
