import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericInput } from './types';

export interface InputField extends GenericInput {
  placeholder: string;
  inputType: string;
}

@Component({
  selector: 'app-field-input',
  templateUrl: './input.html',
  styleUrls: ['./field.scss']
})
export class InputFieldComponent {
  @Input() field: InputField;
  @Input() first: boolean;
  @Input() last: boolean;

  @Output() delete = new EventEmitter<null>();
  @Output() clone = new EventEmitter<null>();
  @Output() shiftUp = new EventEmitter<null>();
  @Output() shiftDown = new EventEmitter<null>();
  @Output() addField = new EventEmitter<string>();

  showAddButtons = false;

  showButtons() {
    this.showAddButtons = !this.showAddButtons;
  }

  onClickField(type: string) {
    this.addField.emit(type);
  }
}

