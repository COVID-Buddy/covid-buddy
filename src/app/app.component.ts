import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as mixpanel from 'mixpanel-browser';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hasResults = false;
  results = null;
  qrLink = environment.qr;

  constructor(public translate: TranslateService,
    private router: Router,
    private updates: SwUpdate) {
    mixpanel.init('47937b3e6ff712fff4739d524ebacc09');
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.results = localStorage.getItem('test_results');
        if (this.results && this.results.length > 0) {
          this.hasResults = true;
          this.results = JSON.parse(this.results);
        }

        let dataIndex = event.url.indexOf(';');
        let url = event.url;
        if (dataIndex > -1) {
          url = url.substr(0, dataIndex);
        }

        mixpanel.track('page ' + url, {
          url: url,
          type: 'navigation',
        });
      }
    })

  	let lang = localStorage.getItem('lang');
  	if (!lang || lang == 'en') {
  		lang = this.translate.getBrowserLang();
      if (!lang || lang == '') {
        lang = 'en';
      }
  	}

  	translate.use(lang);
    mixpanel.register({
      lang: lang,
      langBrowser: this.translate.getBrowserLang(),
    });

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
    mixpanel.track('set language', {
      language: lang,
    });
    mixpanel.register({
      lang: lang,
    });

    localStorage['lang'] = lang;
    this.translate.use(lang).subscribe(() => {}, err => {
      console.log('unable to set language', err)
    });
  }
}
