import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-wlan',
  templateUrl: './wlan.page.html',
  styleUrls: ['./wlan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WLANPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
