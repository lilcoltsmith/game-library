import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../core/service/user/user.service';
import { USER_SERVICE_ERROR } from '../core/constants';
import { UserCookie } from '../core/model/user-cookie.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  cookie$: Subscription;
  cookie: UserCookie;
  userLoading = true;
  userError = '';

  cSelected = false;
  fSelected = false;

  faTrash = faTrashAlt;

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.cookie$ = this.user.getCookieObservable().subscribe((cookie) => {
      this.cookie = cookie;
    }, () => {
      this.userError = USER_SERVICE_ERROR;
      this.cookie = {} as UserCookie;
    }, () => {
      this.userLoading = false;
    });
  }

  ngOnDestroy(): void {
    if(this.cookie$) {
      this.cookie$.unsubscribe();
    }
  }
}