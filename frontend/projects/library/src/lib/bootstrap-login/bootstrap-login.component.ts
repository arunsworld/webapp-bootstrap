import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation, ViewChild,
  ElementRef, AfterContentInit, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'ab-bootstrap-login',
  templateUrl: 'bootstrap-login.component.html',
  styles: ['.login-spinner {font-size:35px; color:green;}']
})
export class BootstrapLoginComponent implements AfterContentInit {

  @Input() loggingIn = false;
  @Output() login = new EventEmitter<LoginCredentials>();
  @ViewChild('login') login_text: ElementRef;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private renderer: Renderer) {
    this.loginForm = fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngAfterContentInit(): void {
    this.renderer.invokeElementMethod(this.login_text.nativeElement, 'focus');
  }

  reset_form() {
    this.loginForm.reset();
  }

  do_login(event: MouseEvent) {
    const btn = event.currentTarget;
    this.login.emit(this.loginForm.value);
  }

}

export interface LoginCredentials {
  email: string;
  password: string;
}
