import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
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

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData: LoginData) {
    console.log('loginData :>> ', loginData);
    return this.httpClient.post(`${env.pathApi}/authenticate`, loginData, {
      headers: this.requestHeader,
    });
  }

  public forAdmin() {
    console.log('forAdmin just triggred');
    return this.httpClient.get(`${env.pathApi}/admin`, {
      responseType: 'text',
    });
  }

  public isRoleMatch(allowRole: string) {
    let currentRole = this.userAuthService.getRole();
    console.log('currentRole :>> ', currentRole);
    if (allowRole === currentRole) {
      return true;
    }
    return false;
  }
}
