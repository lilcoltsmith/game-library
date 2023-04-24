import { Component, OnDestroy, OnInit } from '@angular/core';
import { faArrowDown, faCog, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { UserService } from './core/service/user/user.service';
import { DARK_THEME, DEFAULT_USER_PREFERENCES, LIGHT_THEME } from './core/constants';
import { UserCookie } from './core/model/user-cookie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'game-library';

  // Font Awesome!
  faArrowDownSolid = faArrowDown;
  faMoon = faMoon;
  faSun = faSun;
  faCog = faCog;

  burgerIsActive = false;
  cookie$: Subscription;
  cookie: UserCookie;

  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.user.getUserPreferenceCookie();
    this.cookie$ = this.user.getCookieObservable().subscribe((cookie) => {
      this.cookie = cookie;
    }, (error) => {
      this.cookie = DEFAULT_USER_PREFERENCES;
    });
    this.burgerIsActive = false;
  }

  ngOnDestroy(): void {
    if(this.cookie$) {
      this.cookie$.unsubscribe();
    }
  }

  toggleTheme(): void {
    if (this.user.cookie.themePreference === DARK_THEME) {
      this.user.setUserThemePreference(LIGHT_THEME);
    } else {
      this.user.setUserThemePreference(DARK_THEME);
    }
  }

  toggleBurgerMenu() {
    this.burgerIsActive = !this.burgerIsActive;
  }

}
