import {Component, NgModule, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import {NgFor, NgStyle} from "@angular/common";
import {StorageService} from "../_services/storage.service";
import {Person, persons} from "./person/person";
import {person} from "ionicons/icons";

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.page.html',
  styleUrls: ['leaderboard.page.scss'],
  imports: [
    IonicModule,
    NgFor,
    NgStyle
  ],
  standalone: true
})

export class LeaderboardPage {

  constructor(private router: Router, private storage: StorageService) {
    persons.push(new Person("test"));
    persons.push(new Person("leonit"));
    persons.push(new Person("leonit"));
    persons.push(new Person("leonit"));
    persons.push(new Person("leonit"));
    persons.push(new Person("leonit"));
    let selectedPerson = persons.find(item => item.name == "test");
    selectedPerson?.setTime(100);
    selectedPerson?.addPotato();
    selectedPerson?.addPotato();
    selectedPerson?.addSchnitzel();
  }

  complete(){
    this.storage.set("test", persons)
  }

  loadFromStorage(){
    let persons = this.storage.get(person)
  }

  navigateToStartseite() {
    this.router.navigate(['/login']);
  }


  protected readonly persons = persons;
}

