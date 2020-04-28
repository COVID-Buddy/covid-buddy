import { Component, Input } from '@angular/core';
import { Field } from './field';

export interface DropdownValue {
  value: any;
  label: string;
}
export interface RadioField extends Field {
  label: string;
  values: DropdownValue[];
}

@Component({
  selector: 'app-exercise-field-radio',
  templateUrl: './radio.html'
})
export class RadioComponent {
  @Input() field: RadioField;
}
