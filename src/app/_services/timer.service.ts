import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}
  private taskTimerSource = new BehaviorSubject<number>(0);
  private taskInterval: any;
  timer$ = this.taskTimerSource.asObservable();

  private potatoTimerSource = new BehaviorSubject<number>(60);
  private potatoInterval: any;
  potatoTimer$ = this.potatoTimerSource.asObservable();

  startTimer() {
    this.taskInterval = setInterval(() => {
      const currentTime = this.taskTimerSource.getValue();
      this.taskTimerSource.next(currentTime + 1);
    }, 1000);
  }
  stopTimer() {
    this.taskTimerSource.next(0);
    clearInterval(this.taskInterval);
  }
  getTimer(): number {
    return this.taskTimerSource.getValue();
  }

  startPotatoTimer() {
    this.potatoInterval = setInterval(() => {
      const currentTime = this.potatoTimerSource.getValue();
      if (currentTime > 0) {
        this.potatoTimerSource.next(currentTime - 1);
      }
    }, 1000);
  }
  stopPotatoTimer() {
    clearInterval(this.potatoInterval);
    this.potatoTimerSource.next(60);
  }
  getPotatoTimer(): number {
    return this.potatoTimerSource.getValue();
  }
}
