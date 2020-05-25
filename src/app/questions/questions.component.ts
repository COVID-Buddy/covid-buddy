import { Component, OnInit, ViewChild, ElementRef, NgZone, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as mixpanel from 'mixpanel-browser';
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
    private router: Router,
    private snackbar: MatSnackBar) { }

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

        if (q.inputs) {
          q.inputs.forEach(input => {
            input._response = JSON.parse(localStorage.getItem(q.name + "_" + input.name));
            if (input.type == "number") {
              input._response = parseInt(input._response)
              if (isNaN(input._response)) {
                delete(input._response);
              }
            }
          })
        }
      });
    });
  }

  ngAfterViewInit() {
    this.swiper = new Swiper(this._swiperEl.nativeElement, {
      allowSlideNext: false,
      allowSlidePrev: false,
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
      let hasError = false;
      question.inputs.forEach(input => {
        if (input._response) {
          let key = question.name + "_" + input.name;
          this.test[key] = input._response;
          localStorage.setItem(key, JSON.stringify(input._response));
        }

        if (input.required && (!input._response || input._response == "")) {
          this.snackbar.open(this.translate.instant('input_required'), this.translate.instant('buttons.ok'), {
            duration: 3000,
          });
          hasError = true;
          mixpanel.track('input error', { question: question.name, input: input.name });
          return;
        }
      });

      if (hasError) {
        return;
      }
    }

    window.scrollTo(0, 0);

    if (this.swiper.isEnd) {
      localStorage.setItem('test_results', JSON.stringify(this.test));
      this.router.navigate(['/qr', this.test]);
      return;
    }

    this.swiper.allowSlideNext = true;
    mixpanel.track('next question', { index: this.swiper.activeIndex });
    this.next();
    this.swiper.allowSlideNext = false;
    this.swiper.allowSlidePrev = false;
  }
}
