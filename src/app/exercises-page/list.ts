import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Field, GenericInput } from './types';
import { ExerciseService } from './svc';

export interface ListField extends GenericInput {
  component: Field;
  // allow user to repeat
  repeatable: boolean;
  min: number;
  max: number;
  // initial number of component[s]
  initial: number;
}

@Component({
  selector: 'app-field-list',
  templateUrl: './list.html',
  styleUrls: ['./field.scss']
})
export class ListComponent {
  @Input() field: ListField;
  @Input() first: boolean;
  @Input() last: boolean;

  @Output() delete = new EventEmitter<null>();
  @Output() clone = new EventEmitter<null>();
  @Output() shiftUp = new EventEmitter<null>();
  @Output() shiftDown = new EventEmitter<null>();
  @Output() addField = new EventEmitter<string>();

  showAddButtons = false;

  constructor(private svc: ExerciseService) {
  }

  setField(type: string) {
    const name = '';
    const newObj = this.svc.newField(type, name);

    this.field.component = newObj;
  }

  showButtons() {
    this.showAddButtons = !this.showAddButtons;
  }

  onClickField(type: string) {
    this.addField.emit(type);
  }
}
