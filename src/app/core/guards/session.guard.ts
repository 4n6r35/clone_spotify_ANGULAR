import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class sessionGuard implements CanActivate {

  constructor(private _cookieService: CookieService, private _router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkCookiesSession();
  }

  checkCookiesSession(): boolean {
    try {
      const token: boolean = this._cookieService.check('token_service')
      if (!token) {
        this._router.navigate(['/', 'auth'])
      }
      return token

    } catch (error) {
      console.log('🔴 Algo ha sucedio al momento de logearte 🔴', error)
      return false
    }
  }
};
