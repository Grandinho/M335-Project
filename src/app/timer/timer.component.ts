import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../person.service';
import { IonContent } from '@ionic/angular/standalone';
import { DecimalPipe } from '@angular/common';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
  imports: [IonContent, DecimalPipe],
})
export class TimerComponent implements OnInit {
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  constructor(
    private personService: PersonService,
    private timerService: TimerService,
  ) {}

  ngOnInit() {
    this.subscribeTimer();
  }

  subscribeTimer() {
    this.timerService.timer$.subscribe((timer: number) => {
      this.hours = Math.floor(timer / 3600);
      this.minutes = Math.floor((timer - this.hours * 3600) / 60);
      this.seconds = timer - (this.hours * 3600 + this.minutes * 60);
    });
  }
}
