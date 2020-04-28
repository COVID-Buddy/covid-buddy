import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

// import fade in animation
import { slideInOutAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public translate: TranslateService,
    private router: Router,
    private updates: SwUpdate) {
  	let lang = localStorage.getItem('lang');
  	if (!lang || lang == 'en') {
  		lang = 'en';
  	}

  	translate.use(lang);

    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => {
        document.location.reload();
      });
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  setLanguage(lang: string) {
    localStorage['lang'] = lang;
    this.translate.use(lang).subscribe(() => {}, err => {
      console.log('unable to set language', err)
    });
  }
}
