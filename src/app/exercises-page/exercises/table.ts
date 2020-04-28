import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Field } from './field';

export interface Column {
  title: string;
  placeholder: string;
}
export interface TableField extends Field {
  rows: number;
  columns: Column[];
}

@Component({
  selector: 'app-exercise-field-table',
  templateUrl: './table.html',
})
export class TableComponent {
  _field: TableField;

  @Output() delete = new EventEmitter<null>();
  @Output() clone = new EventEmitter<null>();

  get field() {
    return this._field;
  }
  @Input() set field(f: TableField) {
    this._field = f;
  }

  trackByFn(index: number, val) {
    return index;
  }
}
