import { Component } from '@angular/core';
import { Camera} from '@capacitor/camera';
import { Geolocation} from '@capacitor/geolocation';
import {AlertController, IonicModule} from '@ionic/angular';
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PermissionsPage {
  hasCameraPermission: boolean = false;
  hasLocationPermission: boolean = false;

  constructor(private alertCtrl: AlertController,private router:Router) {
    this.checkPermissions();
  }

  async checkPermissions() {
    const cameraStatus = await Camera.checkPermissions();
    const geolocationStatus = await Geolocation.checkPermissions();

    this.hasCameraPermission = cameraStatus.camera === 'granted';
    this.hasLocationPermission = geolocationStatus.location === 'granted';
  }

  async requestPermissions() {
    if (!this.hasCameraPermission) {
      await Camera.requestPermissions();
    }
    if (!this.hasLocationPermission) {
      await Geolocation.requestPermissions();
    }
    // Re-check permissions after requesting
    this.checkPermissions();
  }

  get canProceed(): boolean {
    return this.hasCameraPermission && this.hasLocationPermission;
  }

  buttonClicked() {
    this.router.navigate(['/tasks/geolocation'])
  }
}
