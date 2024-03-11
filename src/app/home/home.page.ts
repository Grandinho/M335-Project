import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton} from '@ionic/angular/standalone';
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton],
})
export class HomePage {
  constructor(private router: Router) {}

  buttonClicked() {
    this.router.navigate(['/login']);
  }
}