import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'ab-datepicker',
  template: `
    <input class="form-control" type="text" #datePicker/>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit {

  @Input() options: any;
  @Output() selected = new EventEmitter<any>();

  @ViewChild('datePicker') datePicker: ElementRef;

  private _datePicker: any;
  private default_options = {
    format: 'dd-M-yyyy',
    todayBtn: 'linked',
    calendarWeeks: true,
    autoclose: true,
    todayHighlight: true
  };

  constructor() { }

  ngOnInit() {
    this._datePicker = $(this.datePicker.nativeElement);
    $.extend(this.default_options, this.options);
    this._datePicker.datepicker(this.default_options);
    this._datePicker.on('changeDate', (e) => {
      this.selected.emit(this.formatted_date_from_event(e));
    });
    this.disable_editing_input_field();
  }

  reset() {
    this._datePicker.datepicker('update', '');
  }

  set(new_date: Date) {
    this._datePicker.datepicker('update', new_date);
  }

  private date_exists_in_event(e) {
    return ('date' in e);
  }

  private disable_editing_input_field() {
    this._datePicker.on('keydown paste', (e) => {
      e.preventDefault();
      return false;
    });
  }

  private date_from_event(e) {
    return e.date;
  }

  private formatted_date_from_event(e) {
    return e.format([0], 'yyyy-mm-dd');
  }

}
