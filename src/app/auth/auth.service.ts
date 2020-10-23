import { Injectable } from '@angular/core';
import * as authAction from '../auth/reduxStore/auth.action';
import * as fromApp from '../globalStore/app.reducer';

import { User } from './user.model';
import { Store } from '@ngrx/store';



@Injectable({ providedIn: 'root' })
export class AuthService {

  private exptrDateTimer = null;

  constructor(private store : Store<fromApp.AppState>){}


  clearTimeOut(){
    if(this.exptrDateTimer){
      clearTimeout(this.exptrDateTimer);
    }
    this.exptrDateTimer = null;
  }

  setLogoutTimer(exprirationSec : number){
      this.exptrDateTimer = setTimeout(
        ()=>{
          this.store.dispatch(authAction.LogOutAciton());
        }, exprirationSec
      );
  }


}
