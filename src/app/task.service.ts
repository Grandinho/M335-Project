import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Haptics } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskTitleSource = new BehaviorSubject<string>('Default Title');
  taskTitle$ = this.taskTitleSource.asObservable();

  private taskCompletionSource = new BehaviorSubject<boolean>(false);
  taskCompletion$ = this.taskCompletionSource.asObservable();

  private nextRouteSource = new BehaviorSubject<string>('');
  nextRoute$ = this.nextRouteSource.asObservable();

  setTaskTitle(taskTitle: string) {
    this.taskTitleSource.next(taskTitle);
  }
  completeTask(isCompleted: boolean) {
    this.taskCompletionSource.next(isCompleted);
  }
  nextRoute(route: string) {
    this.nextRouteSource.next(route);
  }

  getTaskCompletion(): boolean {
    return this.taskCompletionSource.getValue();
  }

  constructor() {}
}
