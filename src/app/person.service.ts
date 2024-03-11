import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from './leaderboard/person/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private personSource = new BehaviorSubject<Person>(new Person());
  person$ = this.personSource.asObservable();

  setPersonName(name: string) {
    const currentPerson = this.personSource.getValue();
    currentPerson.setName(name);
    this.personSource.next(currentPerson);
  }
  setPersonTime(time: number) {
    const currentPerson = this.personSource.getValue();
    currentPerson.setTime(time);
    this.personSource.next(currentPerson);
  }
  addPersonSchnitzel() {
    const currentPerson = this.personSource.getValue();
    currentPerson.addSchnitzel();
    this.personSource.next(currentPerson);
  }

  addPersonPotato() {
    const currentPerson = this.personSource.getValue();
    currentPerson.addPotato();
    this.personSource.next(currentPerson);
  }

  getPerson(): Person {
    return this.personSource.getValue();
  }

  getPersonName(): string {
    const currentPerson = this.personSource.getValue();
    return currentPerson.name;
  }
  getPersonTime(): number {
    const currentPerson = this.personSource.getValue();
    return currentPerson.timeInSeconds;
  }
  getPersonSchnitzelCount(): number {
    const currentPerson = this.personSource.getValue();
    return currentPerson.schnitzelCount;
  }
  getPersonPotatoCount(): number {
    const currentPerson = this.personSource.getValue();
    return currentPerson.potatoCount;
  }
}
