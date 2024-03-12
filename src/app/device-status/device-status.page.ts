import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskService } from '../task.service';
import { Device } from '@capacitor/device';
import { batteryDeadOutline, batteryChargingOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.page.html',
  styleUrls: ['./device-status.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DeviceStatusPage implements OnInit {
  isCharging?: boolean = false;
  interval: any;
  completed: boolean = false;
  constructor(private taskService: TaskService) {}

  async ngOnInit() {
    this.taskService.nextRoute('task/wlan');
    this.taskService.setTaskTitle('Device status');
    addIcons({ batteryDeadOutline, batteryChargingOutline });

    await this.startBatteryCheck();
  }

  async checkBatteryInfo() {
    if (!this.completed) {
      const batteryInfo = await Device.getBatteryInfo();
      this.isCharging = batteryInfo.isCharging;
      if (this.isCharging) {
        this.taskService.completeTask(true);
        this.completed = true;
        clearInterval(this.interval);
        Haptics.vibrate();
      } else {
        this.taskService.completeTask(false);
      }
    }
  }

  async startBatteryCheck() {
    await this.checkBatteryInfo();
    this.interval = setInterval(() => {
      this.checkBatteryInfo();
    }, 400);
  }
}
