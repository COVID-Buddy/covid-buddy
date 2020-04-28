import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-field-buttons',
  templateUrl: './add-field-buttons.component.html'
})

export class AddFieldButtonsComponent {
  @Output() addField = new EventEmitter<string>();

  constructor() {
  }

  field(type: string) {
    this.addField.emit(type);
  }
}
