import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { PersonService } from '../_services/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ], // Import Ionic components here for standalone usage
})
export class LoginPage {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),
  });

  constructor(
    private router: Router,
    private personService: PersonService,
  ) {}

  start() {
    if (this.loginForm.valid) {
      console.log('Nutzername ist gültig: ', this.loginForm.value.username);
      if (this.loginForm.value.username)
        this.personService.setPersonName(this.loginForm.value.username);
      this.router.navigate(['/permissions']);
    } else {
      console.error('Nutzername ist ungültig!');
    }
  }
}
