import { Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { Field } from './types';
import * as SimpleMDE from 'simplemde';

export interface ParagraphField extends Field {
  text: string;
}

@Component({
  selector: 'app-field-paragraph',
  templateUrl: './paragraph.html',
  styleUrls: ['./field.scss']
})

export class ParagraphComponent {
  @Input() field: ParagraphField;
  @Input() first: boolean;
  @Input() last: boolean;

  mde: any;
  showAddButtons = false;

  @Output() delete = new EventEmitter<null>();
  @Output() clone = new EventEmitter<null>();
  @Output() shiftUp = new EventEmitter<null>();
  @Output() shiftDown = new EventEmitter<null>();
  @Output() addField = new EventEmitter<string>();

  @ViewChild('textarea') set textarea(el: ElementRef) {
    if (!el || !el.nativeElement || this.mde) {
      return;
    }

    this.mde = new SimpleMDE({
      element: el.nativeElement,
      forceSync: true,
      initialValue: this.field.text,
    });

    this.mde.codemirror.on('change', () => {
      this.zone.run(() => {
        this.field.text = this.mde.value();
      });
    });
  }

  constructor(private zone: NgZone) {
  }

  showButtons() {
    this.showAddButtons = !this.showAddButtons;
  }

  onClickField(type: string) {
    this.addField.emit(type);
  }
}
