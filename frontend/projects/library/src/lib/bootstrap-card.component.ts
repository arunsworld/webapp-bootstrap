import { Component, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ab-bootstrap-card',
  template: `
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">{{ header }}</div>
        <div class="card-body">
            <ng-content></ng-content>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class BootstrapCardComponent implements AfterViewInit {

  @Input() header: string;

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cd.detach();
  }

}
