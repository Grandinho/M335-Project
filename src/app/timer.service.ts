import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}
  private timerSource = new BehaviorSubject<number>(0);
  private interval: any;
  timer$ = this.timerSource.asObservable();

  startTimer() {
    this.interval = setInterval(() => {
      const currentTime = this.timerSource.getValue();
      this.timerSource.next(currentTime + 1);
    }, 1000);
  }

  stopTimer() {
    this.timerSource.next(0);
    clearInterval(this.interval);
  }

  getTimer(): number {
    return this.timerSource.getValue();
  }
}
