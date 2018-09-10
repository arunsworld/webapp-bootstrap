import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'ab-demo-nav',
  template: `
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/demo/forms">Forms</a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/demo/loading">Loading</a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/demo/login">Login</a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/demo/chart">Charts</a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/demo/bubble">Bubble</a>
      </li>
    </ul>
  `,
  styles: []
})
export class DemoNavComponent {

  constructor(private element: ElementRef) {
    element.nativeElement.className = 'mr-auto';
  }

}
