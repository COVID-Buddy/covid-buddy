import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericInput } from './types';

export interface RatingField extends GenericInput {
  stars: number;
}

@Component({
  selector: 'app-field-rating',
  templateUrl: './rating.html',
  styleUrls: ['./field.scss']
})

export class RatingComponent {
  @Input() field: RatingField;
  @Input() first: boolean;
  @Input() last: boolean;

  @Output() delete = new EventEmitter<null>();
  @Output() clone = new EventEmitter<null>();
  @Output() shiftUp = new EventEmitter<null>();
  @Output() shiftDown = new EventEmitter<null>();
  @Output() addField = new EventEmitter<string>();

  showAddButtons = false;

  showButtons() {
    this.showAddButtons = !this.showAddButtons;
  }

  onClickField(type: string) {
    this.addField.emit(type);
  }
}
