import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './home/user.component';
import { LoginRouteGuard } from './login/login.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [LoginRouteGuard], children: [
        {path: 'users', component: UserComponent},
        {path: '', redirectTo: 'users', pathMatch: 'full'}
    ]},
    {path: '**', redirectTo: '/home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
