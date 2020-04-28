import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericInput } from './types';

export interface TextareaField extends GenericInput {
  placeholder: string;
  rows: number;
}

@Component({
  selector: 'app-field-textarea',
  templateUrl: './textarea.html',
  styleUrls: ['./field.scss']
})
export class TextareaFieldComponent {
  @Input() field: TextareaField;
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
