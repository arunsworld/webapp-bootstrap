import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ab-loading',
  template: `
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">{{ headerMessage }}</div>
        <div class="card-body">
          <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class LoadingComponent implements AfterViewInit {

  @Input() headerMessage: string;

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cd.detach();
  }

}
