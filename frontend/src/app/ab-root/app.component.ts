import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'ab-root',
    template: `
        <router-outlet></router-outlet>
    `,
    styles: []
})
export class AppComponent implements OnInit {

    ngOnInit(): void {
    }
}
