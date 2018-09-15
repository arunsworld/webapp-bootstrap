import { NgModule } from '@angular/core';
import { DemoHomeComponent } from './lib/demo-home.component';
import { DemoNavComponent } from './lib/demo-nav.component';
import { DemoProfileComponent } from './lib/demo-profile.component';
import { DemoFormsComponent } from './lib/demo-forms/demo-forms.component';
import { DemoLoadingComponent } from './lib/demo-loading.component';
import { LibraryModule } from '../../library/src/public_api';
import { DemoRoutingModule } from './demo-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoLoginComponent } from './lib/demo-login.component';
import { DemoChartComponent } from './lib/demo-chart.component';
import { DemoBubbleChartComponent } from './lib/demo-bubble.component';
import { DemoDataTableComponent } from './lib/demo-datatable.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibraryModule,
    DemoRoutingModule
  ],
  declarations: [
    DemoHomeComponent, DemoNavComponent, DemoProfileComponent, DemoFormsComponent, DemoLoadingComponent,
    DemoLoginComponent, DemoChartComponent, DemoBubbleChartComponent, DemoDataTableComponent
  ],
  exports: []
})
export class DemoModule { }
