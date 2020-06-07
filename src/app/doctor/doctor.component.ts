import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent {
	accessCode: number;
	attempts = 0;
	unlocked = false;
	results: any = {};

  constructor(private router: Router,
  	private snackbar: MatSnackBar) { }

  access() {
  	if (this.accessCode != 2019) {
  		if (++this.attempts >= 3) {
  			this.router.navigate(['/']);
  		}

  		this.snackbar.open('Invalid access code', 'OK', { duration: 5000 });
      return;
  	}

  	this.unlocked = true;
  }

  save() {
  	localStorage['doctor_results'] = JSON.stringify(this.results);
  	this.snackbar.open('Saved', 'OK', { duration: 5000 });
  	this.router.navigate(['/']);
  }
}
