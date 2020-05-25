import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import QRious from 'qrious';
import marked from 'marked';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent {
  _canvas: ElementRef;
  meds = [];
  questions = [];
  doctor: any = [];

  constructor(private route: ActivatedRoute,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private toast: MatSnackBar) {
    route.params.subscribe(params => {
      let doctorStr = localStorage.getItem('doctor_results');
      if (doctorStr && doctorStr.length > 0) {
        let doctor: any = {};
        try {
          doctor = JSON.parse(doctorStr);
        } catch {
          doctor = {};
        }

        if (!doctor) doctor = {};

        ['covid', 'cxr', 'blood_tests', 'disposition'].forEach(key => {
          this.translate.get('doctor.' + key + '.' + doctor[key]).subscribe(value => {
            this.doctor.push(value);
          });
        });
      }

      this.translate.get('questions').subscribe(questions => {
        let data = [];
        questions = JSON.parse(JSON.stringify(questions));

        let groups = {};

        for (let key in params) {
          if (key == 'start' || !params.hasOwnProperty(key)) {
            continue;
          }

          for (let i = 0; i < questions.length; i++) {
            let question = questions[i];
            question._title = this.sanitizer.bypassSecurityTrustHtml(marked(question.title));

            let group: any = {
              title: "",
              answer: "",
              key: "",
              question: question,
            };

            if (key == question.name) {
              group.key = question.name;
              group.title = question._title;
              group.answer = params[key];
            } else {
              continue;
            }

            if (!groups[group.key]) {
              groups[group.key] = group;
            } else {
              group = groups[group.key];
            }

            if (question.buttons) {
              for (let bi = 0; bi < question.buttons.length; bi++) {
                let btn = question.buttons[bi];
                if (btn.value == params[key]) {
                  group.answer = btn.title;
                }
              }
            }
          }
        }

        questions = [];
        for (let key in groups) {
          questions.push(groups[key]);
        }

        translate.get('meds').subscribe(meds => {
          meds = JSON.parse(JSON.stringify(meds));
          this.meds = [];
          meds.forEach(med => {
            med.symptoms.forEach(symptom => {
              if (params[symptom] != "yes") {
                return;
              }

              med.show = true;
              questions.forEach(question => {
                if (question.key == symptom) {
                  question.med = med;
                }
              });
            });
          });

          questions.forEach(question => {
            if (!question.med) {
              return;
            }

            this.questions.push(question);
          });
        });
      });
    });
  }

  share(title, text) {
    (navigator as any).share({
      title: title,
      text: title + '\n' + text,
    }).catch((error) => {});
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
  }
}
