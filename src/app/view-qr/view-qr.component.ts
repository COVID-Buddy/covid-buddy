import {
	Component,
	OnInit,
	ViewEncapsulation,
	Inject,
	Optional,
	ElementRef,
	ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import QRious from 'qrious';

import { QrComponent } from '../qr/qr.component';

@Component({
	selector: 'app-view-qr',
	templateUrl: './view-qr.component.html',
	styleUrls: ['./view-qr.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ViewQrComponent implements OnInit {
	_canvas: ElementRef;
	start: Date;
	data: any = [];

	constructor(private route: ActivatedRoute,
		private translate: TranslateService,
		private sanitizer: DomSanitizer,
		@Optional() public dialogRef: MatDialogRef<QrComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public popupData: any) {
		let lang = localStorage.getItem('lang');
		if (lang && lang != 'en') {
			translate.use('en');
		}

		route.params.subscribe(params => this.parseParams(params));

		if (popupData && popupData.params) {
			this.parseParams(popupData.params);
		}
	}

	ngOnInit(): void {
	}

	parseParams(params: any) {
		this.start = new Date(parseInt(params.start) * 1000);

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
					question._title = this.sanitizer.bypassSecurityTrustHtml(question.title);

					let group: any = {
						title: "",
						answer: "",
						answers: [],
						highlight: ["stress", "stress_2", "suicide"].indexOf(question.name) > -1,
					};

					if (key == question.name) {
						group.key = question.name;
						group.title = question._title;
						group.answer = params[key];
					} else if (key.indexOf(question.name + "_") > -1) {
						group.key = question.name + "_";
						group.title = question._title;
					} else {
						continue;
					}

					if (!groups[group.key]) {
						groups[group.key] = group;
					} else {
						group = groups[group.key];
					}

					if (question.inputs) {
						for (let ii = 0; ii < question.inputs.length; ii++) {
							let input = question.inputs[ii];
							if (key != group.key + input.name) {
								continue;
							}
							 
							let answer = {
								title: this.sanitizer.bypassSecurityTrustHtml(input.label),
								answer: "",
							}

							if (input.type == "checkbox") {
								if (params[key] == "true") {
									answer.answer = "Yes"
								} else if (params[key] == "false") {
									answer.answer = "No"
								}
							} else {
								answer.answer = params[key];
							}

							group.answers.push(answer);
						}
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

			for (let key in groups) {
				this.data.push(groups[key]);
			}
		});
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
