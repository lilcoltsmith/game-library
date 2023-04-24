import { COOKIE_NAME, DEFAULT_USER_PREFERENCES } from './../../constants';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { UserCookie } from '../../model/user-cookie.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // tslint:disable-next-line: variable-name
  _cookie: BehaviorSubject<UserCookie>;
  expiresDate: Date = new Date(2030, 1, 1);

  get cookie() {
    return this._cookie.value;
  }

  constructor(private cookieService: CookieService) {
    this._cookie = new BehaviorSubject<UserCookie>(DEFAULT_USER_PREFERENCES);
   }

  getCookieObservable(): Observable<UserCookie> {
    return this._cookie.asObservable();
  }

  getUserPreferenceCookie(): void {
    const cookieExists: boolean = this.cookieService.check(COOKIE_NAME);
    if (cookieExists) {
      const cookie: UserCookie = JSON.parse(this.cookieService.get(COOKIE_NAME));
      this._cookie.next(cookie);
    } else {
      this._cookie.next(DEFAULT_USER_PREFERENCES);
    }
  }

  setUserThemePreference(theme: string): void {
    const cookieExists = this.cookieService.check(COOKIE_NAME);
    let cookie: UserCookie;
    if (cookieExists) {
      cookie = JSON.parse(this.cookieService.get(COOKIE_NAME));
      cookie.themePreference = theme;
    } else {
      cookie = {
        themePreference: theme
      };
    }
    this.cookieService.set(COOKIE_NAME, JSON.stringify(cookie), this.expiresDate, '/', undefined, false, 'Strict');
    this._cookie.next(cookie);
  }
}
