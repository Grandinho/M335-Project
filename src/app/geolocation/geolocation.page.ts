import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GeolocationPage implements OnInit {
  currentLocation = { lat: 0, lng: 0 };
  targetLocation = { lat: 47.071586, lng: 8.348635 };
  distance: number = 0;
  geolocationError: any;
  watchId: any;
  constructor(
    private zone: NgZone,
    private alertController: AlertController,
  ) {}

  async ngOnInit() {
    await this.startLocationWatch();
  }

  async startLocationWatch() {
    const options = {
      enableHighAccuracy: true, // Use high accuracy mode
      timeout: 10000, // Timeout after 10 seconds
      maximumAge: 0, // Accept only fresh locations
    };
    try {
      this.watchId = Geolocation.watchPosition(options, (position, err) => {
        this.zone.run(() => {
          if (position) {
            this.currentLocation.lat = position.coords.latitude;
            this.currentLocation.lng = position.coords.longitude;
            this.distance = this.haversineDistance(
              this.currentLocation,
              this.targetLocation,
            );
            if (this.distance <= 5) {
              this.presentAlert();
            }
          } else {
            console.log(err);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Glückwunsch',
      message: 'Du hast die Aufgabe geschafft!',
      buttons: ['Weiter'],
    });

    await alert.present();
  }

  haversineDistance(
    coords1: { lat: number; lng: number },
    coords2: { lat: number; lng: number },
  ): number {
    const toRad = (x: any) => (x * Math.PI) / 180;
    const R = 6371; // Earth radius in km

    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lng - coords1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.lat)) *
        Math.cos(toRad(coords2.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d * 1000; // Distance in km
  }
}
