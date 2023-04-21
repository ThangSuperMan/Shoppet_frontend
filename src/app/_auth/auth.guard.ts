import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('canActivate in auth gruad is running...');
    const role = route.data['role'];

    if (this.userAuthService.getToken() !== null) {
      const isMatchRole = this.userService.isRoleMatch(role);
      if (isMatchRole) {
        return true;
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
