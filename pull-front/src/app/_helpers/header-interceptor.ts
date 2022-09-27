import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { LoguinServiceService } from '../services/auth/loguin-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: LoguinServiceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request.clone({
      headers: new HttpHeaders({
      })
    })).pipe(catchError((err) => {
      if (err.status === 401) {
        this.authenticationService.logout();
        location.reload();
      }
      const error = err.error.message || err.statusText;
      return throwError(() => error);
    }), tap(
      () => {}
    ))
  }
}