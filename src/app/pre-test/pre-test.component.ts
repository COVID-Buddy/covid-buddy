import { Component, OnInit, ViewChild, ElementRef, NgZone, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

import Swiper from 'swiper';

@Component({
  selector: 'app-pre-test',
  templateUrl: './pre-test.component.html',
  styleUrls: ['./pre-test.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PreTestComponent {
	constructor(private sanitizer: DomSanitizer,
    private zone: NgZone) { }
}
