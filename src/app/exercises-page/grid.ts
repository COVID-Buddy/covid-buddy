import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Field } from './types';
import { ExerciseService } from './svc';

export interface GridField extends Field {
  columns: Field[];
}

@Component({
  selector: 'app-field-grid',
  templateUrl: './grid.html',
  styleUrls: ['./field.scss'],
})
export class GridFieldComponent {
  @Input() field: GridField;
  @Input() index: number = null;
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

  addNewField(type: string) {
    const name = '';
    const newObj = this.svc.newField(type, name);

    this.field.columns.push(newObj);
  }

  deleteField(index: number) {
    this.field.columns.splice(index, 1);
  }

  cloneField(index: number) {
    this.field.columns.push(JSON.parse(JSON.stringify(this.field.columns[index])));
  }

  onClickField(type: string) {
    this.addField.emit(type);
  }

  showButtons() {
    this.showAddButtons = !this.showAddButtons;
  }
}
