import { NgModule } from '@angular/core';
import { LoadingComponent } from './lib/loading.component';
import { BootstrapNavbarComponent } from './lib/bootstrap-navbar.component';
import { Select2Component } from './lib/select2.component';
import { DatepickerComponent } from './lib/datepicker.component';
import { BootstrapLoginComponent } from './lib/bootstrap-login/bootstrap-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [LoadingComponent, BootstrapNavbarComponent, Select2Component, DatepickerComponent,
    BootstrapLoginComponent],
  exports: [LoadingComponent, BootstrapNavbarComponent, Select2Component, DatepickerComponent,
    BootstrapLoginComponent]
})
export class LibraryModule { }
