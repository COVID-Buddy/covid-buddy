import { Component, Input } from '@angular/core';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.html',
})
export class Exercise {
  @Input() content: any;

  constructor(private exerciseSvc: ExerciseService) {}

  save() {
    this.exerciseSvc.saveValues();
  }
}