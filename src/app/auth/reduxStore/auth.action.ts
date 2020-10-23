import { Action, createAction, props } from '@ngrx/store';
import { User } from '../user.model';

export const SIGNUP_START = 'SIGNUP_START';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const AUTO_LOGIN = 'AUTO_LOGIN';

export const CLEAR_ERROR = 'CLEAR_ERROR';


// export class LoginAction implements Action{
//   readonly type : string = LOGIN;

//   constructor(public payload : { user :User , redirect : boolean}){}
// }

// export class LogInStartAciton implements Action{
//   readonly type : string = LOGIN_START;

//   constructor(public payload : { email : string , password : string }){}
// }

// export class LoginFailAction implements Action{
//   readonly type : string = LOGIN_FAIL;

//   constructor(public payload : string ){}
// }

// export class LogOutAciton implements Action{
//   readonly type : string = LOGOUT;
// }

// export class SignUpStartAciton implements Action{
//   readonly type : string = SIGNUP_START;

//   constructor(public payload : { email : string , password : string }){}
// }


// export class CLearErrorAction implements Action{
//   readonly type : string = CLEAR_ERROR;
// }

// export class AutoLogInAction implements Action{
//   readonly type : string = AUTO_LOGIN;
// }


export const LogInStartAciton = createAction(
  LOGIN_START,
  props< { email : string , password : string }>()
);


export const LoginAction = createAction(
  LOGIN,
  props<{  user :User , redirect : boolean }>()
);

export const LoginFailAction = createAction(
  LOGIN_FAIL,
  props<{ errorMess : string }>()
);

export const LogOutAciton = createAction(
  LOGOUT
);

export const SignUpStartAciton = createAction(
  SIGNUP_START,
  props<{ email : string , password : string }>()
);

export const CLearErrorAction = createAction(
  CLEAR_ERROR
);
export const AutoLogInAction = createAction(
  AUTO_LOGIN
);


