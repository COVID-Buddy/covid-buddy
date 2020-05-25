import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss']
})
export class EmergencyComponent implements OnInit {
  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back() {
  	this.location.back();
  }
}
