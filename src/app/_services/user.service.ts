import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '@env';

interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpClient: HttpClient) {}

  public login(loginData: LoginData) {
    console.log('loginData :>> ', loginData);
    return this.httpClient.post(`${env.pathApi}/authenticate`, loginData, {
      headers: this.requestHeader,
    });
  }
}
