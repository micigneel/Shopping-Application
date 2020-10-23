import { CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';

@Injectable({
  providedIn : 'root'
})
export class AuthGuard implements CanActivate{


    constructor(private authSer : AuthService,
                private router : Router,
                private store : Store<fromApp.AppState>){}

    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot)
                    :boolean | Promise<boolean | UrlTree > | Observable<boolean| UrlTree> | UrlTree{
        // return this.authSer.userSub.pipe(
        //   take(1),
        //   map(
        //   user =>{
        //       const activeUser = !!user;
        //       if(activeUser)
        //           return true;

        //       return this.router.createUrlTree(['/auth']);
        //   }
        // ));

        return this.store.select('auth').pipe(
          take(1),
          map(
          authState =>{
              const activeUser = !!authState.user;
              if(activeUser)
                  return true;

              return this.router.createUrlTree(['/auth']);
          }
        ));
    }
}
