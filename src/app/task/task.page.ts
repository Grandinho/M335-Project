import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import {
  chevronForwardCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TaskService } from '../task.service';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterOutlet,
    TimerComponent,
  ],
})
export class TaskPage implements OnInit {
  currentTitle = 'Default TItle';
  taskCompleted: boolean = false;
  nextRoute: string = '';
  constructor(
    private router: Router,
    private taskService: TaskService,
  ) {
    addIcons({ chevronForwardCircleOutline, closeCircleOutline });
  }
  ngOnInit() {
    this.taskService.taskCompletion$.subscribe((isCompleted) => {
      this.taskCompleted = isCompleted;
    });
    this.taskService.nextRoute$.subscribe((nextRoute) => {
      this.nextRoute = nextRoute;
    });
    this.taskService.taskTitle$.subscribe((taskTitle) => {
      this.currentTitle = taskTitle;
    });
  }

  navigateToNextTask() {
    this.router.navigate([this.nextRoute]);
  }

  navigateToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }
}
