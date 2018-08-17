import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoFormsComponent } from './lib/demo-forms/demo-forms.component';
import { DemoLoadingComponent } from './lib/demo-loading.component';
import { DemoHomeComponent } from './lib/demo-home.component';
import { DemoLoginComponent } from './lib/demo-login.component';

const routes: Routes = [
  {path: 'demo', component: DemoHomeComponent, children: [
    {path: 'forms', component: DemoFormsComponent},
    {path: 'loading', component: DemoLoadingComponent},
    {path: 'login', component: DemoLoginComponent},
    {path: '**', redirectTo: 'forms'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
