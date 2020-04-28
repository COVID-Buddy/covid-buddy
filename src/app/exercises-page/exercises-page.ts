import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from './svc';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.html',
  styleUrls: ['./exercises-page.scss']
})
export class ExercisesPage {
  exercises: any = [];
  exercisesObj = '';
  status = '';
  managed = false;

  constructor(private exerciseSvc: ExerciseService,
    private route: ActivatedRoute,
    private router: Router) {
    route.params.subscribe(params => {
      this.exercises = [];
    });
  }

  addSection() {
    this.exercises.push({
      header: 'Step ' + (this.exercises.length + 1),
      fields: []
    });
  }

  addField(type: string, index: number) {
    const name = this.exerciseSvc.slugify(this.exercises[index].header) + '_' + this.exercises[index].fields.length;
    const newObj = this.exerciseSvc.newField(type, name);

    this.exercises[index].fields.push(newObj);
  }

  convertJson() {
    if (this.exercisesObj.length === 0) {
      return;
    }

    this.exercises = [];
    try {
      this.exercises = JSON.parse(this.exercisesObj);
    } catch (e) {
    }
  }

  clear() {
    this.exercises = [];
    this.exercisesObj = '';
  }

  save() {
    // figure out if name is reused
    const unames = {};
    this.exercises.forEach(step => {
      step.fields.forEach(field => {
        if (!(field.name && field.name.length > 0)) {
          return;
        }

        if (!unames[field.name]) {
          unames[field.name] = 0;
        }

        unames[field.name]++;
      });
    });

    const warn = [];
    for (const key in unames) {
      if (unames[key] > 1) {
        warn.push('!! Key "' + key + '" used ' + unames[key] + ' times. Names must be unique throughout the whole exercise.');
      }
    }

    this.status = '';
    if (warn.length > 0) {
      this.status = warn.join('\n');
    }

    this.exercisesObj = JSON.stringify(this.exercises);
  }

  back() {
    this.router.navigate(['/tracks', this.route.snapshot.params.track_id]);
  }

  deleteSection(index: number) {
    this.exercises.splice(index, 1);
  }

  deleteField(section, index: number) {
    section.fields.splice(index, 1);
  }

  cloneField(section, index: number) {
    section.fields.push(JSON.parse(JSON.stringify(section.fields[index])));
  }

  shiftFieldUp(index: number, x: number) {
    const fields = this.exercises[index].fields;
    const temp = fields[x];
    fields[x] = fields[x - 1];
    fields[x - 1] = temp;
  }

  shiftFieldDown(index: number, x: number) {
    const fields = this.exercises[index].fields;
    const temp = fields[x];
    fields[x] = fields[x + 1];
    fields[x + 1] = temp;
  }

  insertField(type: string, i: number, x: number) {
    const name = this.exerciseSvc.slugify(this.exercises[i].header) + '_' + this.exercises[i].fields.length;
    const newObj = this.exerciseSvc.newField(type, name);
    this.exercises[i].fields.splice(x + 1, 0, newObj);
  }

}
