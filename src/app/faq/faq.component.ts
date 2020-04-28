import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import marked from 'marked';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
	faqs: any = [];
  changeSub = null;

  constructor(private translate: TranslateService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.changeSub = this.translate.onLangChange.subscribe(change => {
      this.updateFaq();
    });

    this.updateFaq();
  }

  ngOnDestroy() {
    this.changeSub.unsubscribe();
  }

  updateFaq() {
    this.translate.get('faq.items').subscribe(faqs => {
      this.faqs = faqs;
      this.faqs.forEach((faq: any) => {
        faq._html = this.sanitizer.bypassSecurityTrustHtml(marked(faq.text));
      })
    });
  }
}
