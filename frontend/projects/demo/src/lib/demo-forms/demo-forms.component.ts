import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Select2Component, DatepickerComponent, Select2Data } from '../../../../library/src/public_api';

@Component({
  templateUrl: 'demo-forms.component.html',
  styles: []
})
export class DemoFormsComponent implements OnInit {

  signInForm: FormGroup;
  us_states: Array<Select2Data>;

  datepicker_options = {
    startDate: '-1y'
  };

  @ViewChild('usState') usStateElem: Select2Component;
  @ViewChild('myDate') myDateElem: DatepickerComponent;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.us_states = [
      new Select2Data('1', 'Texas'),
      new Select2Data('2', 'California')
    ];
    setTimeout(() => {
      const new_us_states = [
        new Select2Data('1', 'Karnataka'),
        new Select2Data('2', 'Assam'),
        new Select2Data('3', 'Kashmir'),
        new Select2Data('4', 'Kerela'),
        new Select2Data('5', 'New Delhi'),
        new Select2Data('6', 'Goa')
      ];
      this.us_states = new_us_states;
    }, 500);
  }

  createForm() {
    this.signInForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      address: null,
      state: [null, Validators.required],
      date: [null, Validators.required]
    });
  }

  reset_form() {
    this.signInForm.reset();
    this.usStateElem.reset();
    this.myDateElem.reset();
  }

  state_changed(new_state: Select2Data) {
    this.signInForm.patchValue({state: new_state});
    if (new_state !== null) {
      this.signInForm.markAsTouched();
    }
  }

  date_changed(new_date: any) {
    this.signInForm.patchValue({date: new_date});
    this.signInForm.markAsTouched();
  }

}
