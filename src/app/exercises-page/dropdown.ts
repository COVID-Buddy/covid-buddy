import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericInput } from './types';

export interface DropdownValue {
  label: string;
  value: any;
}

export interface DropdownField extends GenericInput {
  values: DropdownValue[];
}

@Component({
  selector: 'app-field-dropdown',
  templateUrl: './dropdown.html',
  styleUrls: ['./field.scss']
})
export class DropdownComponent {
  @Input() field: DropdownField;
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

  deleteVal(index: number) {
    this.field.values.splice(index, 1);
  }

  showButtons() {
    this.showAddButtons = !this.showAddButtons;
  }

  onClickField(type: string) {
    this.addField.emit(type);
  }
}
