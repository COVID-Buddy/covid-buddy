import { Component, OnInit, ViewChild, ElementRef, NgZone, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import marked from 'marked';
import Swiper from 'swiper';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionsComponent implements OnInit {
  _swiperEl: ElementRef;
  swiper: Swiper;
  changeSub = null;
  questions = [];

  test: any = {};

  constructor(private translate: TranslateService,
    private sanitizer: DomSanitizer,
    private zone: NgZone,
    private router: Router) { }

  ngOnInit(): void {
    this.changeSub = this.translate.onLangChange.subscribe(change => {
      this.updateSlides();
    });

    this.updateSlides();
  }

  ngOnDestroy() {
    this.changeSub.unsubscribe();
    this.swiper.destroy(true);
  }

  updateSlides() {
    this.translate.get('questions').subscribe(questions => {
      this.questions = JSON.parse(JSON.stringify(questions));
      this.questions.forEach(q => {
        q._title = this.sanitizer.bypassSecurityTrustHtml(marked(q.title));
      });
    });
  }

  ngAfterViewInit() {
    this.swiper = new Swiper(this._swiperEl.nativeElement, {
      allowSlideNext: false
    });
    this.test.start = Math.round((+new Date()) / 1000);
  }

  @ViewChild('swiperEl') set swiperEl(swiperEl: ElementRef) {
    this._swiperEl = swiperEl;
  }

  @ViewChildren('slideElements') set slideElements(elements: QueryList<ElementRef>) {
    if (this.swiper && this.swiper.slides.length != this.questions.length) {
      this.swiper.update();
    }
  }

  next() {
    this.swiper.slideNext();
  }

  pressedButton(question, button) {
    if (button.action == 'emergency') {
      this.router.navigate(['/emergency']);
      return
    }
    if (button.value) {
      this.test[question.name] = button.value;
    }

    if (question.inputs) {
      question.inputs.forEach(input => {
        if (input._response) {
          this.test[question.name + "_" + input.name] = input._response;
        }
      });
    }

    window.scrollTo(0, 0);

    if (this.swiper.isEnd) {
      this.router.navigate(['/qr', this.test]);
      return;
    }

    this.swiper.allowSlideNext = true;
    this.next();
    this.swiper.allowSlideNext = false;
  }
}
