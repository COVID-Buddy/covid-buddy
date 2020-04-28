import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericInput } from './types';

export interface DropdownValue {
  label: string;
  value: any;
}

export interface RadioField extends GenericInput {
  values: DropdownValue[];
}

@Component({
  selector: 'app-field-radio',
  templateUrl: './radio.html',
  styleUrls: ['./field.scss']
})
export class RadioComponent {
  @Input() field: RadioField;
  @Input() first: boolean;
  @Input() last: boolean;

  @Output() delete = new EventEmitter<null>();
  @Output() clone = new EventEmitter<null>();
  @Output() shiftUp = new EventEmitter<null>();
  @Output() shiftDown = new EventEmitter<null>();
  @Output() addField = new EventEmitter<string>();

  showAddButtons = false;

  addVal() {
    this.field.values.push({
      label: '',
      value: null
    });
  }

  showButtons() {
    this.showAddButtons = !this.showAddButtons;
  }

  deleteVal(index: number) {
    this.field.values.splice(index, 1);
  }

  onClickField(type: string) {
    this.addField.emit(type);
  }
}
