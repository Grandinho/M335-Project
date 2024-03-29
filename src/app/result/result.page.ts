import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { chevronForwardCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { PersonService } from '../_services/person.service';
import { StorageService } from '../_services/storage.service';
import { Person } from '../leaderboard/person/person';
import { TimerService } from '../_services/timer.service';
import { ApiService } from '../_services/api.service';
import { HttpClientModule } from '@angular/common/http';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonProgressBar,
  IonContent,
  IonFooter,
  IonIcon,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { DecimalPipe, NgIf } from '@angular/common';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonProgressBar,
    IonContent,
    IonFooter,
    IonIcon,
    DecimalPipe,
    NgIf,
  ],
  providers: [ApiService],
})
export class ResultPage implements OnInit {
  person: Person = new Person();
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  isSaved: boolean = false;
  private backSubscription: Subscription | undefined;
  constructor(
    private router: Router,
    private personService: PersonService,
    private storageService: StorageService,
    private timerService: TimerService,
    private apiService: ApiService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
  ) {
    addIcons({ chevronForwardCircleOutline });
  }

  async ngOnInit() {
    this.personService.setPersonTime(this.timerService.getTimer());
    this.timerService.stopTimer();
    this.person = this.personService.getPerson();

    await this.storageService.addPerson(this.person).then(() => {
      this.isSaved = true;
    });
    this.calculateTime();
    await this.apiService.postToExcel(
      this.person.name,
      this.person.schnitzelCount.toString(),
      this.person.potatoCount.toString(),
      this.hours,
      this.minutes,
      this.seconds,
    );
  }

  calculateTime() {
    this.hours = Math.floor(this.personService.getPersonTime() / 3600);
    this.minutes = Math.floor(
      (this.personService.getPersonTime() - this.hours * 3600) / 60,
    );
    this.seconds =
      this.personService.getPersonTime() -
      (this.hours * 3600 + this.minutes * 60);
  }

  navigateToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }
  ionViewDidEnter() {
    this.backSubscription = this.platform.backButton.subscribeWithPriority(
      10,
      () => {
        if (!this.routerOutlet.canGoBack()) {
        }
      },
    );
  }

  ionViewWillLeave() {
    this.backSubscription?.unsubscribe();
  }
}
