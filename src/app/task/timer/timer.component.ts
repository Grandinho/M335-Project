import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../../_services/person.service';
import { IonAlert, IonContent } from '@ionic/angular/standalone';
import { DecimalPipe } from '@angular/common';
import { TimerService } from '../../_services/timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
  imports: [IonContent, DecimalPipe, IonAlert],
})
export class TimerComponent implements OnInit, OnDestroy {
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
  private timerSubscription!: Subscription;
  private potatoTimerSubscription!: Subscription;

  constructor(
    private personService: PersonService,
    private timerService: TimerService,
  ) {}

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.potatoTimerSubscription) {
      this.potatoTimerSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscribeTimer();
    this.subscribePotatoTimer();
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  subscribeTimer() {
    this.timerSubscription = this.timerService.timer$.subscribe(
      (timer: number) => {
        this.hours = Math.floor(timer / 3600);
        this.minutes = Math.floor((timer - this.hours * 3600) / 60);
        this.seconds = timer - (this.hours * 3600 + this.minutes * 60);
      },
    );
  }

  subscribePotatoTimer() {
    this.potatoTimerSubscription = this.timerService.potatoTimer$.subscribe(
      (timer: number) => {
        console.log(timer);
        if (timer == 0) {
          this.hasPotato = true;
          this.personService.addPersonPotato();
          this.potatoCount = this.personService.getPersonPotatoCount();
          console.log(this.personService.getPersonPotatoCount());
          this.setOpen(true);
        }
        this.potatoHours = Math.floor(timer / 3600);
        this.potatoMinutes = Math.floor((timer - this.potatoHours * 3600) / 60);
        this.potatoSeconds =
          timer - (this.hours * 3600 + this.potatoMinutes * 60);
      },
    );
  }
}
