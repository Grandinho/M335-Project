import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonService } from '../person.service';
import { persons } from '../leaderboard/person/person';
import { time } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule], // Import Ionic components here for standalone usage
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
    if (this.loginForm.valid && this.loginForm.value.username) {
      console.log('Nutzername ist gültig: ', this.loginForm.value.username);
      this.router.navigate(['/task/geolocation']);
      this.personService.setPersonName(this.loginForm.value.username);
    } else {
      console.error('Nutzername ist ungültig!');
    }
  }

  navigateToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }
}
