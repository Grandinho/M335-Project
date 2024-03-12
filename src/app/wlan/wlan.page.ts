import { Component, OnInit, NgZone } from '@angular/core';
import { TaskService } from '../task.service';
import {
  wifiOutline,
  globeOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Network } from '@capacitor/network';
import { IonIcon } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-wlan',
  templateUrl: './wlan.page.html',
  styleUrls: ['./wlan.page.scss'],
  standalone: true,
  imports: [IonIcon, NgIf],
})
export class WLANPage implements OnInit {
  isConnected: boolean = false;
  isCompleted: boolean = false;
  wasDisconnected: boolean = false;
  constructor(
    private taskService: TaskService,
    private zone: NgZone,
  ) {}

  async ngOnInit() {
    this.taskService.nextRoute('result');
    this.taskService.setTaskTitle('Distance');

    addIcons({ wifiOutline, globeOutline, shieldCheckmarkOutline });

    await this.checkNetworkStatus();
    this.listenNetworkChanges();
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus();
    this.isConnected = status.connected;
    this.wasDisconnected = !this.isConnected;
  }

  listenNetworkChanges() {
    // Listen for network status change events
    Network.addListener('networkStatusChange', (status) => {
      this.zone.run(() => {
        if (!this.isCompleted) {
          this.isConnected = status.connected;
          if (!this.wasDisconnected) {
            this.wasDisconnected = this.isConnected;
          }
          if (this.isConnected && this.wasDisconnected) {
            this.taskService.completeTask(true);
            this.isCompleted = true;
            Haptics.vibrate();
            Network.removeAllListeners();
          }
        }
      });
    });
  }
}
