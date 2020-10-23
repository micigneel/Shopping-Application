import { Actions , ofType, Effect, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import * as authAction from '../reduxStore/auth.action';
import { User } from '../user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  key : string = "AIzaSyDxdZgqtm8jxMcpOaXaZEmRLNRMmvhXjgY";
  signUpURL : string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.key;
  loginURL : string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.key;


  constructor(private actions$ : Actions,
              private http : HttpClient,
              private router : Router,
              private authSrvice : AuthService){}


  //Before Login effect
  authLogin$ =createEffect( ()=>{
      return this.actions$.pipe(
        ofType(authAction.LogInStartAciton),
        switchMap( (authData) =>{
          return this.http.post<AuthResponseData>(this.loginURL,
            {
              email	: authData.email,
              password : authData.password,
              returnSecureToken	: true
            }).pipe(
              tap(
                resData =>{
                  this.authSrvice.setLogoutTimer(+resData.expiresIn*1000);
                }
              ),
              map( resData =>{
                return authAction.LoginAction({
                  user : this.handleData(resData),
                  redirect : true
                });
              }),
              catchError( err =>{
                return of(authAction.LoginFailAction({
                  errorMess : this.handleError(err)
                }));
              })
            )
        })
    )
    }
  )

  //@Effect()
  // authLogin = this.actions$.pipe(
  //     ofType(authAction.LogInStartAciton),
  //     switchMap( (authData) =>{
  //       return this.http.post<AuthResponseData>(this.loginURL,
  //         {
  //           email	: authData.email,
  //           password : authData.password,
  //           returnSecureToken	: true
  //         }).pipe(
  //           tap(
  //             resData =>{
  //               this.authSrvice.setLogoutTimer(+resData.expiresIn*1000);
  //             }
  //           ),
  //           map( resData =>{
  //             return authAction.LoginAction({
  //               user : this.handleData(resData),
  //               redirect : true
  //             });
  //           }),
  //           catchError( err =>{
  //             return of(authAction.LoginFailAction({
  //               errorMess : this.handleError(err)
  //             }));
  //           })
  //         )
  //     })
  // );

  //Before Sign Up


    @Effect()
    authSignUp = this.actions$.pipe(
      ofType(authAction.SignUpStartAciton),
      switchMap((authData)=>{
         return this.http.post<AuthResponseData>(this.signUpURL,
          {
            email	: authData.email,
            password : authData.password,
            returnSecureToken	: true
          }).pipe(
            tap(
              resData =>{
                this.authSrvice.setLogoutTimer(+resData.expiresIn*1000);
              }
            ),
            map( resData =>{
              return authAction.LoginAction({
                user : this.handleData(resData),
                redirect : true
              });
            }),
            catchError( err =>{
              return of(authAction.LoginFailAction({
                errorMess : this.handleError(err)
              }));
            })
          )
        })
    );

  //Navigation Effect

    @Effect({dispatch : false})
    authSuccess = this.actions$.pipe(
      ofType(authAction.LoginAction),
      tap(
       (authLoginAction)=>{
         if(authLoginAction.redirect){
            this.router.navigate(['/recipes']);
         }
       }
      )
    );

    // @Effect({dispatch : false})
    // authLogOut = this.actions$.pipe(
    //   ofType(authAction.LOGOUT),
    //   tap(
    //    ()=>{
    //     sessionStorage.removeItem('userData');
    //     this.authSrvice.clearTimeOut();
    //     this.router.navigate(['/auth']);
    //    }
    //   )
    // );


    authLogOut$ = createEffect(
      ()=>{
        return this.actions$.pipe(
          ofType(authAction.LogOutAciton),
          tap(
            ()=>{
             sessionStorage.removeItem('userData');
             this.authSrvice.clearTimeOut();
             this.router.navigate(['/auth']);
            }
           )
        )
      },
      { dispatch : false}
    )


    //Auto LogIn
    @Effect()
    authAutoLogOut = this.actions$.pipe(
      ofType(authAction.AutoLogInAction),
      map(
        ()=>{
          const user : {
            emial : string,
            id : string,
             _token : string,
             _tokenExpirationDate : string
          } = JSON.parse(sessionStorage.getItem('userData'));

          if(!user)
            return { type : 'INVALID'};

          const loggedUser = new User(user.emial, user.id, user._token, new Date(user._tokenExpirationDate));
          console.log("loggedUser ="+loggedUser)
          if(loggedUser.token){
            const expTime = new Date(user._tokenExpirationDate).getTime() - new Date().getTime()
            this.authSrvice.setLogoutTimer(+expTime);
            return authAction.LoginAction({
              user :loggedUser,
              redirect : false
            });
          }

          return { type : 'INVALID'};
        }
      )
    );


    //Handling map Success Data
       private handleData (resData : any){
        const exprirationDate  = new Date(new Date().getTime() + (+resData.expiresIn *1000));
        const user = new User(resData.email, resData.localId, resData.idToken, exprirationDate);
        sessionStorage.setItem('userData', JSON.stringify(user));
        return  user;
       }

    //Handling Login Errors
    private handleError(errorRes : HttpErrorResponse){
      let errorMessage ="Unkown Error has occured!";

        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS' :  errorMessage ="This email already exists!";
            break;
          case 'EMAIL_NOT_FOUND' :  errorMessage ="This email does not exist!";
            break;
          case 'INVALID_PASSWORD' :  errorMessage ="Invalid password!";
            break;
          case 'USER_DISABLED' :  errorMessage ="Account disabled!";
            break;
        }
        return errorMessage;
    }

}
