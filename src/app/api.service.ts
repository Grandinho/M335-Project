import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url =
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc9v68rbCckYwcIekRLOaVZ0Qdm3eeh1xCEkgpn3d7pParfLQ/formResponse';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(private http: HttpClient) {}
  async postToExcel(
    name: string,
    schnitzel: string,
    potato: string,
    hours: number,
    minutes: number,
    seconds: number,
  ) {
    const body =
      `entry.1860183935=${name}` + // Name
      `&entry.564282981=${schnitzel}` + // Schnitzel
      `&entry.1079317865=${potato}` + // Potatoes
      `&entry.985590604=${hours}:${minutes}:${seconds}`; // Duration`);

    this.http.post(this.url, body, this.httpOptions).subscribe(
      (response) => {
        console.log('Response from the server:', response);
      },
      (error) => {
        console.error('Error:', error);
      },
    );
  }
}
