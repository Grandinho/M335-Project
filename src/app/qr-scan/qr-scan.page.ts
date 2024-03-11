import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { qrCodeOutline } from 'ionicons/icons';
import { TaskService } from '../task.service';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.page.html',
  styleUrls: ['./qr-scan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
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
    const granted = await this.requestPermissions();
    if (!granted) {
      return;
    }
    const barcode = await BarcodeScanner.scan();
    this.scanAttempted = true;
    this.barcode = barcode.barcodes[0];

    if (this.barcode.rawValue == this.toScanValue) {
      this.taskService.completeTask(true);
      this.taskCompleted = true;
    } else {
      this.taskService.completeTask(false);
      this.taskCompleted = false;
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
}
