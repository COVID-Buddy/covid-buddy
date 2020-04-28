import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericInput } from './types';

export interface Column {
  title: string;
  placeholder: string;
}

export interface TableField extends GenericInput {
  rows: number;
  columns: Column[];
}

@Component({
  selector: 'app-field-table',
  templateUrl: './table.html',
  styleUrls: ['./field.scss']
})

export class TableComponent {
  private _field: TableField;

  @Input() first: boolean;
  @Input() last: boolean;

  @Output() delete = new EventEmitter<null>();
  @Output() clone = new EventEmitter<null>();
  @Output() shiftUp = new EventEmitter<null>();
  @Output() shiftDown = new EventEmitter<null>();
  @Output() addField = new EventEmitter<string>();

  showAddButtons = false;


  @Input() set field(f: TableField) {
    this._field = f;

    if (f.columns && f.columns.length > 0 && typeof f.columns[0] === 'string') {
      const columns = (f.columns as any) as string[];
      f.columns = [];
      columns.forEach(col => {
        f.columns.push({ title: col, placeholder: '' } as Column);
      });
    }
  }

  get field(): TableField {
    return this._field;
  }

  addVal() {
    this.field.columns.push({} as Column);
  }

  deleteVal(index: number) {
    this.field.columns.splice(index, 1);
  }

  trackByFn(index: number, val) {
    return index;
  }

  showButtons() {
    this.showAddButtons = !this.showAddButtons;
  }

  onClickField(type: string) {
    this.addField.emit(type);
  }
}
