import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { TaskService } from '../../_services/task.service';
import { Haptics } from '@capacitor/haptics';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.page.html',
  styleUrls: ['./distance.page.scss'],
  standalone: true,
  imports: [DecimalPipe],
})
export class DistancePage implements OnInit {
  lastLocation = { lat: 0, lng: 0 };
  currentLocation = { lat: 0, lng: 0 };
  startDistance: number = 5;
  remainingDistance: number = this.startDistance;
  walkedDistance: number = 0;
  completed: boolean = false;
  watchId: any;
  constructor(
    private zone: NgZone,
    private alertController: AlertController,
    private platform: Platform,
    private taskService: TaskService,
  ) {}

  async ngOnInit() {
    await this.startLocationWatch();
    this.taskService.nextRoute('task/qr-scan');
    this.taskService.setTaskTitle('Distance');
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
          if (!this.completed) {
            if (position) {
              this.currentLocation.lat = position.coords.latitude;
              this.currentLocation.lng = position.coords.longitude;
              if (this.lastLocation.lat !== 0 && this.lastLocation.lng !== 0) {
                this.walkedDistance = this.haversineDistance(
                  this.lastLocation,
                  this.currentLocation,
                );
                this.remainingDistance -= this.walkedDistance;
              }
              if (this.remainingDistance <= 0) {
                this.remainingDistance = 0;
                this.taskService.completeTask(true);
                this.completed = true;
                Haptics.vibrate();
              }
              this.lastLocation = { ...this.currentLocation };
            } else {
              console.log(err);
            }
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
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
