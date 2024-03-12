import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonFooter,
  IonSegment,
  IonImg,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { PersonService } from '../_services/person.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonFooter,
    IonSegment,
    IonImg,
  ],
})
export class HomePage {
  constructor(
    private router: Router,
    private personService: PersonService,
  ) {}

  buttonClicked() {
    this.personService.resetPerson();
    this.router.navigate(['/login']);
  }

  navigateToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }
}
