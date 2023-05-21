import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Observable } from 'rxjs';
import { User } from '@models';
import env from '@env';

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
    console.log('login data :>> ', loginData);
    const url = `${env.pathApi}/signin`;
    return this.httpClient.post(url, loginData, {
      headers: this.requestHeader,
    });
  }

  public signup(registerData: RegisterProps) {
    console.log('UserSerivce sign up method is running...');
    console.log('registerData :>> ', registerData);
    const url = `${env.pathApi}/signup`;
    return this.httpClient.post(url, registerData, {
      headers: this.requestHeader,
    });
  }

  public getUserByUsername(username: string): Observable<User> {
    let queryParams = new HttpParams().append('username', username);
    console.log('queryParams :>> ', queryParams);
    const url = `${env.pathApi}/users`;
    return this.httpClient.get<User>(url, {
      params: queryParams,
      headers: this.requestHeader,
    });
  }

  public getUserProfile(): Observable<any> {
    console.log('UserService getUserProfile method is running');
    const url = `${env.pathApi}/user`;
    return this.httpClient.get(url);
  }

  public forAdmin(): Observable<any> {
    console.log('forAdmin just triggred');
    const url = `${env.pathApi}/admin`;
    return this.httpClient.get(url);
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
