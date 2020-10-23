import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp  from './globalStore/app.reducer';
import * as authAction from './auth/reduxStore/auth.action';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService,
              private store : Store<fromApp.AppState>,
              @Inject(PLATFORM_ID) private platformID) {}

  ngOnInit() {
    //this.authService.autoLogin();

    if(isPlatformBrowser(this.platformID)){
      console.log("Code ran on server");
      this.store.dispatch(authAction.AutoLogInAction());
    }
    console.log("Code ran on web");
  }
}
