import { Component, Input } from '@angular/core';
import { Field } from './field';

export interface GridField extends Field {
  columns: Field[];
}

@Component({
  selector: 'app-exercise-field-grid',
  templateUrl: './grid.html',
  styleUrls: ['./grid.scss']
})
export class GridComponent {
  _field: GridField;

  get field() {
    return this._field;
  }
  @Input() set field(f: any) {
    this._field = f;
  }
}
