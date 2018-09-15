import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoFormsComponent } from './lib/demo-forms/demo-forms.component';
import { DemoLoadingComponent } from './lib/demo-loading.component';
import { DemoHomeComponent } from './lib/demo-home.component';
import { DemoLoginComponent } from './lib/demo-login.component';
import { DemoChartComponent } from './lib/demo-chart.component';
import { DemoBubbleChartComponent } from './lib/demo-bubble.component';
import { DemoDataTableComponent } from './lib/demo-datatable.component';

const routes: Routes = [
  {path: 'demo', component: DemoHomeComponent, children: [
    {path: 'forms', component: DemoFormsComponent},
    {path: 'loading', component: DemoLoadingComponent},
    {path: 'login', component: DemoLoginComponent},
    {path: 'chart', component: DemoChartComponent},
    {path: 'bubble', component: DemoBubbleChartComponent},
    {path: 'datatable', component: DemoDataTableComponent},
    {path: '**', redirectTo: 'forms'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
