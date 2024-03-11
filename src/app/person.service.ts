import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private personTimeSource = new BehaviorSubject<number>(0);
  personTime$ = this.personTimeSource.asObservable();

  setPersonTime(time: number) {
    this.personTimeSource.next(time);
  }
}
