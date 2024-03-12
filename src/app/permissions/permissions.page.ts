import { Component, OnInit } from '@angular/core';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  ],
})
export class PermissionsPage implements OnInit {
  hasCameraPermission: boolean = false;
  hasLocationPermission: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private timerService: TimerService,
  ) {}

  async ngOnInit() {
    await this.checkPermissions();
  }

  async checkPermissions() {
    const cameraStatus = await Camera.checkPermissions();
    const geolocationStatus = await Geolocation.checkPermissions();

    this.hasCameraPermission = cameraStatus.camera === 'granted';
    this.hasLocationPermission = geolocationStatus.location === 'granted';
  }
  async requestCameraPermission() {
    const { camera } = await BarcodeScanner.requestPermissions();
    this.hasCameraPermission = camera === 'granted' || camera === 'limited';
  }

  async requestLocationPermission() {
    if (!this.hasLocationPermission) await Geolocation.requestPermissions();
    const geolocationStatus = await Geolocation.checkPermissions();
    this.hasLocationPermission = geolocationStatus.location === 'granted';
  }
  buttonClicked() {
    this.router.navigate(['/task/geolocation']);
    this.timerService.stopPotatoTimer();
    this.timerService.startPotatoTimer();
    this.timerService.startTimer();
  }
}
