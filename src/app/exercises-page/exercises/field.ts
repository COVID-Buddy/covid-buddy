import { Component, Input } from '@angular/core';

export interface Field {
  type: string;
  name: string;
  value: any;
  readonly: boolean;
}

@Component({
  templateUrl: './field.html',
  selector: 'app-exercise-field',
  styleUrls: ['./field.scss'],
})
export class GenericFieldComponent {
  _field: any;

  @Input() set field(field: any) {
    this._field = field;

    if (!field.name && field.type !== 'grid') {
      console.warn('Field with no name', field);
    }
  }
}
