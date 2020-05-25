import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as mixpanel from 'mixpanel-browser';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  browser = "bn";

  constructor(private translate: TranslateService,
  	private router: Router) { }

  ngOnInit(): void {
    this.browser = this.translate.getBrowserLang();
    if (!this.browser || this.browser == "") {
      this.browser = "en";
    }
  }

  setLanguage(lang: string) {
    mixpanel.track('set language', {
      language: lang,
    });
    mixpanel.register({
      lang: lang,
    });

		localStorage['lang'] = lang;
  	this.translate.use(lang).subscribe(() => {
  		this.router.navigate(['/pre-test'])
  	}, err => {
  		console.log('unable to set language', err)
  	});
  }
}
