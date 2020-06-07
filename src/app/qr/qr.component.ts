import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import marked from 'marked';

import { ViewQrComponent } from '../view-qr/view-qr.component';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent {
  meds = [];
  questions = [];
  doctor: any = [];
  translateSub;

  constructor(private route: ActivatedRoute,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private toast: MatSnackBar,
    private dialog: MatDialog) {
    route.params.subscribe(params => {
      this.updateQuestions(params);
    });

    this.translateSub = translate.onLangChange.subscribe(() => {
      this.updateQuestions(route.snapshot.params);
    });
  }

  ngOnDestroy() {
    this.translateSub.unsubscribe();
  }

  updateQuestions(params) {
    this.meds = [];
    this.questions = [];
    this.doctor = [];

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
        console.log('doctor.' + key + '.' + doctor[key]);
        this.translate.get('doctor.' + key + '.' + doctor[key]).subscribe(value => {
          console.log('doctor.' + key + '.' + doctor[key], value);
          if (!value) return;
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
        if (key == 'stress' || key == 'stress_2') {
          questions.splice(0, 0, groups[key]);
        } else {
          questions.push(groups[key]);
        }
      }

      this.translate.get('meds').subscribe(meds => {
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
  }

  share(title, text) {
    (navigator as any).share({
      title: title,
      text: title + '\n' + text,
    }).catch((error) => {});
  }

  openQR() {
    this.dialog.open(ViewQrComponent, {
      width: '98vw',
      data: {
        qr: window.location.protocol + "//" + window.location.hostname + "/view" + document.location.pathname,
        params: this.route.snapshot.params,
      },
    }).afterClosed().subscribe(() => {
      let lang = localStorage.getItem('lang');
      if (lang) {
        this.translate.use(lang);
      }
    })
  }
}
