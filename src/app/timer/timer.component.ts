import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../person.service';
import { IonAlert, IonContent } from '@ionic/angular/standalone';
import { DecimalPipe } from '@angular/common';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
  imports: [IonContent, DecimalPipe, IonAlert],
})
export class TimerComponent implements OnInit {
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  potatoHours: number = 0;
  potatoMinutes: number = 0;
  potatoSeconds: number = 0;
  hasPotato: boolean = false;
  potatoCount: number = 0;
  isAlertOpen = false;
  alertButtons = ['OK'];

  constructor(
    private personService: PersonService,
    private timerService: TimerService,
  ) {}

  ngOnInit() {
    this.subscribeTimer();
    this.subscribePotatoTimer();
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  subscribeTimer() {
    this.timerService.timer$.subscribe((timer: number) => {
      this.hours = Math.floor(timer / 3600);
      this.minutes = Math.floor((timer - this.hours * 3600) / 60);
      this.seconds = timer - (this.hours * 3600 + this.minutes * 60);
    });
  }

  subscribePotatoTimer() {
    this.timerService.potatoTimer$.subscribe((timer: number) => {
      console.log(timer);
      if (timer == 0) {
        this.hasPotato = true;
        this.personService.addPersonPotato();
        this.potatoCount = this.personService.getPersonPotatoCount();
        this.setOpen(true);
      }
      this.potatoHours = Math.floor(timer / 3600);
      this.potatoMinutes = Math.floor((timer - this.potatoHours * 3600) / 60);
      this.potatoSeconds =
        timer - (this.hours * 3600 + this.potatoMinutes * 60);
    });
  }
}
