import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DEFAULT_USER_PREFERENCES } from '../core/constants';
import { UserCookie } from '../core/model/user-cookie.model';
import { UserService } from '../core/service/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cookie$: Subscription;
  cookie: UserCookie;
  userLoading = true;
  userError = '';

  constructor(public user: UserService) { }

  ngOnInit(): void {
    this.cookie$ = this.user.getCookieObservable().subscribe((cookie) => {
      this.cookie = cookie;
    }, (error) => {
      this.cookie = DEFAULT_USER_PREFERENCES;
    });
  }
}
