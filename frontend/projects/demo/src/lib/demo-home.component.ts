import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <ab-bootstrap-navbar brand="Demo App">
            <ab-demo-nav></ab-demo-nav>
            <ab-profile-nav></ab-profile-nav>
        </ab-bootstrap-navbar>
        <div class="container-fluid bodycontent">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: ['.bodycontent { padding-top: 80px; }']
})
export class DemoHomeComponent { }
