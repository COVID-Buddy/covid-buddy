import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import QRious from 'qrious';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {
  _canvas: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

  @ViewChild('canvas') set canvas(el: ElementRef) {
    this._canvas = el;
  	this.render();
  }

  render() {
    if (!this._canvas) return;

    let qr = new QRious({
      value: window.location.protocol + "//" + window.location.hostname + "/view" + document.location.pathname,
      element: this._canvas.nativeElement,
      size: this._canvas.nativeElement.offsetWidth,
    });
    console.log(qr);
  }
}
