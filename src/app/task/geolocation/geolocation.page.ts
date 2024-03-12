import { Component, OnInit, NgZone } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { TaskService } from '../../_services/task.service';
import { Haptics } from '@capacitor/haptics';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: true,
  imports: [DecimalPipe],
})
export class GeolocationPage implements OnInit {
  currentLocation = { lat: 0, lng: 0 };
  targetLocation = { lat: 47.071558, lng: 8.348688 };
  distance: number = 0;
  watchId: any;
  completed: boolean = false;
  constructor(
    private zone: NgZone,
    private alertController: AlertController,
    private taskService: TaskService,
  ) {}
  async ngOnInit() {
    await this.startLocationWatch();
    this.taskService.nextRoute('task/distance');
    this.taskService.setTaskTitle('Geolocation');
  }

  async startLocationWatch() {
    const options = {
      enableHighAccuracy: true, // Use high accuracy mode
      timeout: 10000, // Timeout after 10 seconds
      maximumAge: 0, // Accept only fresh locations
    };
    this.watchId = Geolocation.watchPosition(options, (position, err) => {
      this.zone.run(() => {
        if (!this.completed) {
          if (position) {
            this.currentLocation.lat = position.coords.latitude;
            this.currentLocation.lng = position.coords.longitude;
            this.distance = this.haversineDistance(
              this.currentLocation,
              this.targetLocation,
            );
            if (this.distance <= 8) {
              this.taskService.completeTask(true);
              this.completed = true;
              Haptics.vibrate();
            }
          } else {
            console.log(err);
          }
        }
      });
    });
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
