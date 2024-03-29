import { Routes } from '@angular/router';

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
    path: 'permissions',
    loadComponent: () =>
      import('./permissions/permissions.page').then((m) => m.PermissionsPage),
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
          import('./task/geolocation/geolocation.page').then(
            (m) => m.GeolocationPage,
          ),
      },
      {
        path: 'qr-scan',
        loadComponent: () =>
          import('./task/qr-scan/qr-scan.page').then((m) => m.QRScanPage),
      },
      {
        path: 'distance',
        loadComponent: () =>
          import('./task/distance/distance.page').then((m) => m.DistancePage),
      },
      {
        path: 'sensor',
        loadComponent: () =>
          import('./task/sensor/sensor.page').then((m) => m.SensorPage),
      },
      {
        path: 'device-status',
        loadComponent: () =>
          import('./task/device-status/device-status.page').then(
            (m) => m.DeviceStatusPage,
          ),
      },
      {
        path: 'wlan',
        loadComponent: () =>
          import('./task/wlan/wlan.page').then((m) => m.WLANPage),
      },
    ],
  },
  {
    path: 'permissions',
    loadComponent: () =>
      import('./permissions/permissions.page').then((m) => m.PermissionsPage),
  },
];
