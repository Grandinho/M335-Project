import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../_services/task.service';
import { Haptics } from '@capacitor/haptics';
import { IonContent } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
  standalone: true,
  imports: [IonContent, NgIf],
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
      this.orientationType = orientationType;
    }
  };
}
