import { Component, Input } from '@angular/core';
import { Field } from './field';

export interface RatingField extends Field {
  label: string;
}

@Component({
  selector: 'app-exercise-field-rating',
  templateUrl: './rating.html',
  styleUrls: ['./rating.scss']
})
export class RatingExerciseComponent {
  @Input() field: RatingField;
  @Input() value = 0;

  set(value) {
    if (this.field.readonly) {
      return;
    }

    this.value = value;
  }
}
