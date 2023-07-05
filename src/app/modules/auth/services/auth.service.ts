import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/env';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.api
  constructor(private http: HttpClient, private _cookie: CookieService, private _router: Router) { }

  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    }
    return this.http.post(`${this.url}/auth/login`, body)
      .pipe(
        tap((responseOk: any) => {
          const { tokenSession, data } = responseOk
          this._cookie.set('token_service', tokenSession, 4, '/')
          this._router.navigate(['/', 'tracks'])
        })
      )
  }
}
