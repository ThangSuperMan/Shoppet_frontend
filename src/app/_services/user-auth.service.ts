import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  public setRoles(role: string) {
    localStorage.setItem('role', role);
  }

  public getRole(): string | null {
    return localStorage.getItem('role');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('access-token', jwtToken);
  }

  public setRefreshToken(jwtRefreshToken: string) {
    localStorage.setItem('refresh-token', jwtRefreshToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('access-token');
  }

  public clear() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('role');
  }

  public isLoggedIn() {
    return this.getRole() && this.getToken();
  }
}
