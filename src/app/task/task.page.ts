import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  chevronForwardCircleOutline,
  closeCircleOutline,
  exit,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TaskService } from '../_services/task.service';
import { TimerComponent } from './timer/timer.component';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { TimerService } from '../_services/timer.service';
import { PersonService } from '../_services/person.service';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular/standalone';
import { Person } from '../leaderboard/person/person';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    TimerComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonContent,
    IonRouterOutlet,
    IonFooter,
    NgIf,
    IonButton,
    IonAlert,
  ],
})
export class TaskPage implements OnInit {
  currentTitle = 'Default TItle';
  taskCompleted: boolean = false;
  nextRoute: string = '';
  private backSubscription: Subscription | undefined;
  person: Person = new Person();
  constructor(
    private router: Router,
    private taskService: TaskService,
    private timerService: TimerService,
    private personService: PersonService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private alertController: AlertController,
  ) {
    addIcons({ chevronForwardCircleOutline, closeCircleOutline });
  }
  ngOnInit() {
    this.taskService.taskCompletion$.subscribe((isCompleted) => {
      this.taskCompleted = isCompleted;
    });
    this.taskService.nextRoute$.subscribe((nextRoute) => {
      this.nextRoute = nextRoute;
    });
    this.taskService.taskTitle$.subscribe((taskTitle) => {
      this.currentTitle = taskTitle;
    });
    this.personService.person$.subscribe((perso) => {
      this.person = perso;
    });
  }

  async navigateToNextTask() {
    await this.router.navigate([this.nextRoute]);
    this.taskService.completeTask(false);
    this.timerService.stopPotatoTimer();
    this.timerService.startPotatoTimer();
  }

  exit() {
    this.taskService.completeTask(false);
    this.taskService.setTaskTitle('');
    this.timerService.stopTimer();
    this.timerService.stopPotatoTimer();
    this.personService.resetPerson();
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

  alertButtons = [
    {
      text: 'Abbrechen',
      role: 'cancel',
      handler: () => {},
    },
    {
      text: 'Beenden',
      role: 'confirm',
      handler: () => {
        this.exit();
      },
    },
  ];
}
