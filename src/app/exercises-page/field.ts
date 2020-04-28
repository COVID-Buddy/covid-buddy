import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-exercise-edit-field',
  templateUrl: './field.html',
  styleUrls: ['./field.scss']
})

export class GenericFieldComponent {
  @Input() field: any;
  @Input() first: boolean;
  @Input() last: boolean;

  @Output() shiftUp = new EventEmitter();
  @Output() shiftDown = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() clone = new EventEmitter();
  @Output() addField = new EventEmitter<string>();
}
