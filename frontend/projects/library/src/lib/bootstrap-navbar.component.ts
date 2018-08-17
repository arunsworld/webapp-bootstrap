import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'ab-bootstrap-navbar',
  template: `
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">{{ brand }}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" \
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" \
          aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ng-content></ng-content>
    </div>
  </nav>
  `,
  styles: []
})
export class BootstrapNavbarComponent implements AfterViewInit {

  @Input() brand: string;

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cd.detach();
  }
}
