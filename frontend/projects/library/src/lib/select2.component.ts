import { Component, OnInit, Input, ViewChild, ElementRef, Output,
  EventEmitter, OnChanges, SimpleChanges, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
declare var $: any;

@Component({
  selector: 'ab-select2',
  template: `
    <select class="form-control" #mySelect="">
      <option></option>
    </select>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Select2Component implements OnInit, OnChanges {

  @Input() placeholder: string;
  @Input() data: Array<Select2Data>;
  @Output() selected = new EventEmitter<Select2Data>();

  @ViewChild('mySelect') mySelect: ElementRef;

  private _mySelect: any;

  constructor() { }

  ngOnInit() {
    this._mySelect = $(this.mySelect.nativeElement);
    this.select2Init(this.placeholder, this.data);
    this.select2EventsInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      const new_data: SimpleChange = changes.data;
      if (!new_data.isFirstChange()) {
        this.updateSelect2Options(new_data.currentValue);
      }
    }
  }

  set(v: string) {
    this._mySelect.val(v);
    this._mySelect.trigger('change.select2');
  }

  reset() {
    this.set(null);
  }

  private select2Init(placeholder: string, data: Array<Select2Data>) {
    this._mySelect.select2({
      placeholder: placeholder,
      theme: 'bootstrap4',
      data: data
    });
  }

  private select2EventsInit() {
    this._mySelect.on('select2:select', (e) => {
      const res = new Select2Data(e.params.data.id, e.params.data.text);
      this.selected.emit(res);
    });
  }

  private updateSelect2Options(newOptions: Array<Select2Data>) {
    this.reset();
    this.selected.emit(null);
    this._mySelect.empty();
    this._mySelect.append(new Option());
    this.select2Init(this.placeholder, newOptions);
  }

}


export class Select2Data {
  id: string;
  text: string;
  disabled: boolean;

  constructor(id: string, text: string, disabled = false) {
    this.id = id;
    this.text = text;
    this.disabled = disabled;
  }
}
