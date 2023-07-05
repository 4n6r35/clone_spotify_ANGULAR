import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectSessionTokenInterceptor implements HttpInterceptor {

  constructor(private _cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try {
      const token = this._cookieService.get('token_service')
      let newRequest = request
      newRequest = request.clone(
        {
          setHeaders: {
            authorization: `Bearer ${token}`
          }
        })
      return next.handle(newRequest);
    } catch (error) {
      console.log('🔴🔴🔴 Ojo se ha presentado error', error);
      return next.handle(request);
    }
  }
}
