import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import {LeaderboardPage} from "./leaderboard/leaderboard.page";
import { TaskPage } from './task/task.page';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./result/result.page').then((m) => m.ResultPage),
  },
  {
    path: 'leaderboard',
    loadComponent: () =>
      import('./leaderboard/leaderboard.page').then((m) => m.LeaderboardPage),
  },
  {
    path: 'task',
    loadComponent: () => import('./task/task.page').then((m) => m.TaskPage),
    children: [
      {
        path: 'geolocation',
        loadComponent: () =>
          import('./geolocation/geolocation.page').then(
            (m) => m.GeolocationPage,
          ),
      },
      {
        path: 'qr-scan',
        loadComponent: () =>
          import('./qr-scan/qr-scan.page').then((m) => m.QRScanPage),
      },
      {
        path: 'distance',
        loadComponent: () =>
          import('./distance/distance.page').then((m) => m.DistancePage),
      },
      {
        path: 'sensor',
        loadComponent: () =>
          import('./sensor/sensor.page').then((m) => m.SensorPage),
      },
      {
        path: 'device-status',
        loadComponent: () =>
          import('./device-status/device-status.page').then(
            (m) => m.DeviceStatusPage,
          ),
      },
      {
        path: 'wlan',
        loadComponent: () => import('./wlan/wlan.page').then((m) => m.WLANPage),
      },
    ],
  },
];
