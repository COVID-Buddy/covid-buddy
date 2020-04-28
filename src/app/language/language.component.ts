import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

// import { slideInOutAnimation } from '../animation';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  // animations: [slideInOutAnimation],
  // host: { '[@slideInOutAnimation]': '' },
})
export class LanguageComponent implements OnInit {
  constructor(private translate: TranslateService,
  	private router: Router) { }

  ngOnInit(): void {
  }

  setLanguage(lang: string) {
		localStorage['lang'] = lang;
  	this.translate.use(lang).subscribe(() => {
  		this.router.navigate(['/pre-test'])
  	}, err => {
  		console.log('unable to set language', err)
  	});
  }
}
