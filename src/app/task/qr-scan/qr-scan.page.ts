import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { qrCodeOutline } from 'ionicons/icons';
import { TaskService } from '../../_services/task.service';
import { addIcons } from 'ionicons';
import { Haptics } from '@capacitor/haptics';
import {
  IonButton,
  IonText,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.page.html',
  styleUrls: ['./qr-scan.page.scss'],
  standalone: true,
  imports: [IonIcon, IonText, IonButton, IonLabel, NgIf],
})
export class QRScanPage implements OnInit {
  isSupported = false;
  barcode?: Barcode;
  toScanValue: string = 'test';
  taskCompleted: boolean = false;
  scanAttempted: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.setTaskTitle('QR scan');
    this.taskService.nextRoute('task/sensor');

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    addIcons({ qrCodeOutline });
  }

  async scan(): Promise<void> {
    if (!this.taskCompleted) {
      const granted = await this.requestPermissions();
      if (!granted) {
        return;
      }
      const barcode = await BarcodeScanner.scan();
      this.scanAttempted = true;
      this.barcode = barcode.barcodes[0];

      if (this.barcode.rawValue === this.toScanValue) {
        this.taskService.completeTask(true);
        this.taskCompleted = true;
        Haptics.vibrate();
      }
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
}
