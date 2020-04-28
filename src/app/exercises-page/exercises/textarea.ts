import { Component, Input } from '@angular/core';
import { Field } from './field';

export interface TextareaField extends Field {
  label: string;
  placeholder: string;
  rows: number;
}

@Component({
  selector: 'app-exercise-field-textarea',
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.scss']
})

export class TextareaComponent {
  @Input() field: TextareaField;
}
