import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskService } from '../task.service';
import {
  wifiOutline,
  globeOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-wlan',
  templateUrl: './wlan.page.html',
  styleUrls: ['./wlan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WLANPage implements OnInit {
  isConnected: boolean = false;
  isCompleted: boolean = false;
  wasDisconnected: boolean = false;
  connectionType?: string;
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
    this.isConnected = status.connectionType === 'wifi';
    this.wasDisconnected = !this.isConnected;
    this.connectionType = status.connectionType;
  }

  listenNetworkChanges() {
    // Listen for network status change events
    Network.addListener('networkStatusChange', (status) => {
      this.zone.run(() => {
        this.isConnected = status.connectionType === 'wifi';
        this.connectionType = status.connectionType;
        if (!this.wasDisconnected) {
          this.wasDisconnected = this.isConnected;
        }
        if (this.isConnected && this.wasDisconnected) {
          this.taskService.completeTask(true);
          this.isCompleted = true;
        } else {
          this.taskService.completeTask(false);
          this.isCompleted = false;
        }
      });
    });
  }
}
