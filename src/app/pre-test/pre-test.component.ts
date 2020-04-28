import { Component, OnInit, ViewChild, ElementRef, NgZone, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

import marked from 'marked';
import Swiper from 'swiper';

@Component({
  selector: 'app-pre-test',
  templateUrl: './pre-test.component.html',
  styleUrls: ['./pre-test.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PreTestComponent implements OnInit {
  // @ViewChildren('slides') slideElements:QueryList<ElementRef>;

  _swiperEl: ElementRef;
	swiper: Swiper;
  slides = [];
  changeSub = null;

	constructor(private translate: TranslateService,
    private sanitizer: DomSanitizer,
    private zone: NgZone) { }

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
    this.translate.get('slides').subscribe(slides => {
      this.slides = slides;
      slides.forEach(slide => {
        slide._html = this.sanitizer.bypassSecurityTrustHtml(marked(slide.content));
      });
    });
  }

  ngAfterViewInit() {
  	this.swiper = new Swiper(this._swiperEl.nativeElement);
  }

  @ViewChild('swiperEl') set swiperEl(swiperEl: ElementRef) {
  	this._swiperEl = swiperEl;
  }

  @ViewChildren('slideElements') set slideElements(elements: QueryList<ElementRef>) {
    if (this.swiper && this.swiper.slides.length != this.slides.length) {
      this.swiper.update();
    }
  }

  next() {
    this.swiper.slideNext();
  }
}
