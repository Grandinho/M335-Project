import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Motion } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core';
import { TaskService } from '../task.service';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SensorPage implements OnInit {
  orientationType: string = '';
  completed: boolean = false;

  constructor(private taskService: TaskService) {}
  ngOnInit() {
    this.taskService.nextRoute('task/device-status');
    this.taskService.setTaskTitle('Sensor');
    this.orientationType = screen.orientation.type;
    window.addEventListener('orientationchange', this.handleOrientationChange);
  }

  handleOrientationChange = () => {
    if (!this.completed) {
      const orientationType = screen.orientation.type;
      if (orientationType === 'landscape-primary') {
        this.taskService.completeTask(true);
        this.completed = true;
        Haptics.vibrate();
        window.removeEventListener(
          'orientationchange',
          this.handleOrientationChange,
        );
      }
    }
  };
}
