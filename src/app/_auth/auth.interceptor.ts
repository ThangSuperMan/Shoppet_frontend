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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private toastService: ToastrService,
    private router: Router,
    private userAuthSerive: UserAuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Sending Request interceptor');
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }
    const jwtToken = this.userAuthSerive.getToken();
    let modifiedRequest = this.addToken(req, jwtToken);

    return next.handle(modifiedRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 403: // Forbidden
            this.toastService.error(`${err.statusText}`, 'Access Error');
            this.router.navigate(['/forbidden']);
            break;
          case 404: // Not found
            this.toastService.error(`${err.statusText}`, 'Route Error');
            break;
          case 500: // External server
              this.toastService.error(`${err.statusText}`, 'Access Error')
            break;
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
