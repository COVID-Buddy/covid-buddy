import { Component, Input, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSlider } from '@angular/material/slider';
import { Pipe, PipeTransform } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as mixpanel from 'mixpanel-browser';

@Pipe({ name: 'secondsToMinutes' })
export class SecondsToMinutesPipe implements PipeTransform {
	transform(time: number): string {
		const minutes = ('0' + Math.floor(time / 60)).slice(-2);
		const seconds = ('0' + time % 60).slice(-2);
		return `${minutes}:${seconds}`;
	}
}

@Component({
	selector: 'mat-basic-audio-player',
	templateUrl: './mat-basic-audio-player.component.html',
	styleUrls: ['./mat-basic-audio-player.component.css']
})
export class MatBasicAudioPlayerComponent {
	audio: any = null;
	audioBlob = null;
	audioPlayer: ElementRef;
	_audioUrl = "";
	timeLineDuration: MatSlider;

	disabled = false;
	loaderDisplay = false;
	isPlaying = false;
	currentTime = 0;
	volume = 0.1;
	duration = 0.01;
	@Input() title: string;
	@Input() displayTitle = false;
	@Input() autoPlay = false;
	@Input() displayVolumeControls = true;

	@Input() set audioUrl(url: string) {
		this._audioUrl = url;
		this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
			this.audioBlob = blob;

			let reader = new FileReader();
			reader.onload = (e) => {
				this.zone.run(() => {
					this.audio = this.sanitizer.bypassSecurityTrustUrl(e.target.result as string);
				});
			};
			reader.readAsDataURL(blob);
		}, () => {
			console.log('disabled');
			this.disabled = true;
		});
	}

	@ViewChild('player', { static: false }) set player(player: ElementRef) {
		if (!player) return;

		this.audioPlayer = player;
		let el = player.nativeElement;
		el.addEventListener('playing', () => {
			this.isPlaying = true;
			this.duration = Math.floor(el.duration);
		});
		el.addEventListener('pause', () => {
			this.isPlaying = false;
		});
		el.addEventListener('timeupdate', () => {
			this.currentTime = Math.floor(el.currentTime);
		});
		el.addEventListener('volume', () => {
			this.volume = Math.floor(el.volume);
		});
		el.addEventListener('loadstart', () => {
			this.loaderDisplay = false;
		});
		el.addEventListener('loadeddata', () => {
			this.loaderDisplay = false;
			this.duration = Math.floor(el.duration);
		});

		if (this.autoPlay) {
			this.play();
		}
	};

	constructor(private http: HttpClient,
		private zone: NgZone,
		private sanitizer: DomSanitizer,
		private snackbar: MatSnackBar) {}

	currTimePosChanged(event) {
		if (!this.audioPlayer || !this.audioPlayer.nativeElement) return;
		this.audioPlayer.nativeElement.currentTime = event.value;
	}

	playBtnHandler(): void {
		let soundPath = this._audioUrl.split('/');
		mixpanel.track('audio play/pause', {
			sound: soundPath[soundPath.length - 1],
		});

		if (!this.audioPlayer) {
			mixpanel.track('unable to play', {
				sound: soundPath[soundPath.length - 1],
			});
			return;
		}

		if (this.loaderDisplay) {
			return;
		}
		if (this.audioPlayer.nativeElement.paused) {
			this.audioPlayer.nativeElement.play(this.currentTime);
		} else {
			this.currentTime = this.audioPlayer.nativeElement.currentTime;
			this.audioPlayer.nativeElement.pause();
		}
	}

	play(): void {
		setTimeout(() => {
			this.audioPlayer.nativeElement.play();
		}, 0);
	}

	toggleVolume() {
		if (this.volume === 0) {
			this.setVolume(1.0);
		} else {
			this.setVolume(0);
		}
	}

	private setVolume(vol) {
		this.volume = vol;
		this.audioPlayer.nativeElement.volume = this.volume;
	}

	resetSong(): void {
		this.audioPlayer.nativeElement.src = this.audio;
	}

	share() {
		let nav = (navigator as any);
    let soundPath = this._audioUrl.split('/');
    let files = [new File([this.audioBlob], soundPath[soundPath.length-1], { type: 'audio/mp3' })];
    if (nav.canShare && nav.canShare({ files })) {
      nav.share({ files });
    }
	}
}
