import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

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
    console.log('route :>> ', route);
    console.log('state :>> ', state);

    const role = route.data['role'];
    console.log('role from data route :>> ', role);

    if (this.userAuthService.getToken() !== null) {
      const isMatchRole = this.userService.isRoleMatch(role);
      console.log('isMatchRole :>> ', isMatchRole);

      if (isMatchRole) {
        return true;
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }
    this.router.navigate(['/login']);
    // this.router.navigate(['/admin']);
    return false;
  }
}
