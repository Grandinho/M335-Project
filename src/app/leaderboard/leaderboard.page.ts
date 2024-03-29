import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgStyle } from '@angular/common';
import { StorageService } from '../_services/storage.service';
import { Person } from './person/person';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonSegment,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.page.html',
  styleUrls: ['leaderboard.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonFooter,
    IonSegment,
    IonButton,
    IonImg,
    NgFor,
    NgStyle
  ],
  standalone: true,
})
export class LeaderboardPage implements OnInit {
  persons: Person[] = [];
  constructor(
    private router: Router,
    private storage: StorageService,
  ) {}
  async ngOnInit() {
    await this.loadFromStorage();
  }

  async loadFromStorage() {
    const storedPersons = await this.storage.getPersons();
    if (Array.isArray(storedPersons)) {
      this.persons.push(...storedPersons);
    }
    this.persons = this.persons.sort(
      (a, b) => a.timeInSeconds - b.timeInSeconds,
    );
  }

  outputTimeAsString(personTime: number): string {
    const hours = Math.floor(personTime / 3600);
    const minutes = Math.floor((personTime - hours * 3600) / 60);
    const seconds = personTime - (hours * 3600 + minutes * 60);

    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }

  navigateToStartseite() {
    this.router.navigate(['/']);
  }
}
