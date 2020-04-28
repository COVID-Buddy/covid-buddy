import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  save = new Observable();
  private save$ = new Subject<null>();

  constructor() {
    this.save = this.save$.asObservable();
  }

  saveValues() {
    this.save$.next(null);
  }
}