import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";

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
      Validators.pattern(/^[a-zA-Z]+$/)
    ])
  });

  constructor(private router: Router) { }

  start() {
    if (this.loginForm.valid) {
      console.log("Nutzername ist gültig: ", this.loginForm.value.username);
    } else {
      console.error("Nutzername ist ungültig!");
    }
    this.router.navigate(['/leaderboard']);
  }
}
