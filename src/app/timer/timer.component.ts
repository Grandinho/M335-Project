import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { IonContent } from '@ionic/angular/standalone';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
  imports: [IonContent, DecimalPipe],
})
export class TimerComponent implements OnInit {
  timer: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      this.timer += 1;
      this.personService.setPersonTime(this.timer);
      this.hours = Math.floor(this.timer / 3600);
      this.minutes = Math.floor((this.timer - this.hours * 3600) / 60);
      this.seconds = this.timer - (this.hours * 3600 + this.minutes * 60);
    }, 1000);
  }
}
