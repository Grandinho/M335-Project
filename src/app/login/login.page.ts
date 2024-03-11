import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({ // Definitive Zuweisung im Konstruktor
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z]+$/)
      ])
    });
  }

  start() {
    if (this.loginForm.valid) {
      console.log("Nutzername ist gültig: ", this.loginForm.value.username);
      this.router.navigate(['/permissions']);
    } else {
      console.error("Nutzername ist ungültig!");
      // Benutzerfeedback hier
    }
  }
}
