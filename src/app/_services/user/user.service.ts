import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import env from '@env';
import { Observable } from 'rxjs';
import { User } from '@models';

export interface LoginProps {
  username: string;
  password: string;
}

export interface RegisterProps {
  username: string;
  password: string;
  confirmPassword: string;
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

  public login(loginData: LoginProps) {
    console.log('UserService login method is running...');
    return this.httpClient.post(`${env.pathApi}/signin`, loginData, {
      headers: this.requestHeader,
    });
  }

  public signup(registerData: RegisterProps) {
    console.log('UserSerivce register method is running...');
    console.log('registerData :>> ', registerData);
    console.log('current sign up route :>> ', `${env.pathApi}/signup`);
    return this.httpClient.post(`${env.pathApi}/signup`, registerData, {
      headers: this.requestHeader,
    });
  }

  public getUserByUsername(username: string): Observable<User> {
    let queryParams = new HttpParams().append('username', username);
    console.log('queryParams :>> ', queryParams);
    return this.httpClient.get<User>(`${env.pathApi}/users`, {
      params: queryParams,
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
