import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Motion } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SensorPage implements OnInit {
  orientationType: string = '';

  constructor(private taskService: TaskService) {}
  ngOnInit() {
    this.taskService.nextRoute('task/device-status');
    this.taskService.setTaskTitle('Sensor');
    window.addEventListener('orientationchange', this.handleOrientationChange);
  }

  handleOrientationChange = () => {
    const orientationType = screen.orientation.type;
    if (
      orientationType === 'landscape-primary' ||
      orientationType === 'landscape-secondary'
    ) {
      this.taskService.completeTask(true);
    }
    this.orientationType = orientationType;
  };
}
