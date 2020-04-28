import { Component, Input } from '@angular/core';
import { Field } from './field';

export interface InputField extends Field {
  label: string;
  placeholder: string;
  inputType: string;
}

@Component({
  selector: 'app-exercise-field-input',
  templateUrl: './input.html',
  styleUrls: ['./input.scss']
})
export class InputComponent {
  @Input() field: InputField;
}
