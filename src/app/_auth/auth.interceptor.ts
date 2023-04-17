import {
  HttpEvent,
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { Injectable } from '@angular/core';

// Injectable header for every requests from client to backend server
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private userAuthSerive: UserAuthService) {
    console.log('AuthInterceptor just inited');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercept method in authe.intercept.ts file');
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const jwtToken = this.userAuthSerive.getToken();

    req = this.addToken(req, jwtToken);

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('Error status :>> ', err.status);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        }
        return throwError(() => 'Something is wrong in here!');
      })
    );
  }

  private addToken(
    request: HttpRequest<any>,
    token: string | null
  ): HttpRequest<any> {
    console.log('addToken');
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
