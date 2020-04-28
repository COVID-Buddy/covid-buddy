import { Component, Input } from '@angular/core';
import { Field } from './field';

export interface DropdownValue {
  value: any;
  label: string;
}

export interface DropdownField extends Field {
  label: string;
  values: DropdownValue[];
}

@Component({
  selector: 'app-exercise-field-dropdown',
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.scss']
})

export class DropdownComponent {
  @Input() field: DropdownField;
}
