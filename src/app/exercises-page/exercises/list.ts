import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseService } from './exercise.service';
import { Field } from './field';

export interface ListField extends Field {
  label: string;
  component: Field;
  // allow user to repeat
  repeatable: boolean;
  min: number;
  max: number;
  // initial number of component[s]
  initial: number;
}

@Component({
  selector: 'app-exercise-field-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class ListComponent {
  private subscriber: Subscription = null;

  _field: ListField = null;
  fields: Field[] = [];

  constructor(private exercisesSvc: ExerciseService) {
  }

  ngOnInit() {
    this.subscriber = this.exercisesSvc.save.subscribe(() => this.saveValues());
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  get field() {
    return this._field;
  }

  @Input() set field(field: any) {
    this._field = field;
    this.fields = [];

    this.addField();
    let initial = this.field.initial;
    if (this.field.value) {
      // existing value ?
      initial = Object.keys(this.field.value).length;
    }
    for (let i = 1; i < initial; i++) {
      this.addField();
    }

    if (this.field.value) {
      this.fields.forEach(f => {
        f.value = this.field.value[f.name];
        f.readonly = this.field.readonly;
      });
    }
  }

  addField() {
    const f = JSON.parse(JSON.stringify(this.field.component));
    f.name = this.field.name + '_' + this.fields.length;
    this.fields.push(f);
  }

  removeField(index) {
    this.fields.splice(index, 1);

    this.renameFields();
  }

  renameFields() {
    this.fields.forEach((f, i) => {
      f.name = this.field.name + '_' + i;
    });
  }

  canRemove(index) {
    if (index === 0) {
      return false;
    }

    if (this.field.min && index + 1 > this.field.min) {
      return true;
    }

    return true;
  }

  canAddMore() {
    return (this.field.repeatable && !this.field.max) ||
      (this.field.repeatable && this.field.max > 0 && this.fields.length < this.field.max);
  }

  trackByFn(index) {
    return index;
  }

  saveValues() {
    let v = {};
    this.fields.forEach(field => {
      v[field.name] = field.value;
    });

    this.field.value = v;
  }
}
