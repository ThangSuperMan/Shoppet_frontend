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
import { ToastrService } from 'ngx-toastr';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private logger: NgxFancyLoggerService,
    private toastService: ToastrService,
    private router: Router,
    private userAuthSerive: UserAuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.logger.info('Sending Request interceptor');
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }
    const jwtToken = this.userAuthSerive.getToken();
    let modifiedRequest = this.addToken(req, jwtToken);
    console.log('jwtToken :>> ', jwtToken);

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('err.status :>> ', error.status);
        switch (error.status) {
          case 403: // Forbidden
            this.toastService.error(`${error.statusText}`, 'Access Error');
            this.router.navigate(['/forbidden']);
            // New
            // Check if the token is expired
            // Before push for forbidden page inject the request intercept with a refresh token
            // and send request to the api again
            const refreshToken = this.userAuthSerive.getRefreshToken();
            let modifiedRequest = this.addToken(req, refreshToken);
            console.log('next.handle :>> ', next.handle);
            const triggerMe = () => {
              console.log('triggerMe ');
              return next.handle(modifiedRequest);
            };
            return triggerMe();
          // break;
          case 404: // Not found
            this.toastService.error(`${error.statusText}`, 'Route Error');
            break;
          case 409: // Conflict
            return throwError(
              () => 'This product exists in your cart, right now!'
            );
          case 500: // External server
            this.toastService.error(`${error.statusText}`, 'Access Error');
            break;
        }

        console.log('error :>> ', error);
        return throwError(() => 'Something is wrong in here!');
      })
    );
  }

  private addToken(
    request: HttpRequest<any>,
    token: string | null
  ): HttpRequest<any> {
    this.logger.info('addToken');
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
