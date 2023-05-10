import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import env from '@env';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  requestHeader = new HttpHeaders({
    'No-Auth': 'True',
  });

  constructor(private httpClient: HttpClient) {}

  public getGeolocation(latitude: number, longitude: number): Observable<any> {
    console.log('GetLocationService getGeolocation method is running...');
    const url = `${env.pathApi}/geolocation?latitude=${latitude}&longitude=${longitude}`;
    console.log('url :>> ', url);
    return this.httpClient.get<any>(url, {
      headers: this.requestHeader,
    });
  }
}
