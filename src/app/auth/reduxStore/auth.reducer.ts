import { User } from '../user.model';
import * as fromAuth from './auth.action';
import { Action, createReducer, on } from '@ngrx/store';

export interface State{
  user :User,
  errorMessage : string,
  loading : boolean
}

export const initialState ={
  user : null,
  errorMessage : null,
  loading : false
}

// export function authReducer(state : State = initialState, action : any){
//     switch(action.type){
//       case  fromAuth.LOGIN :
//             const loggedUser : User = action.payload.user;
//             return {
//               ...state,
//              user : loggedUser,
//              errorMessage : null,
//              loading : false
//            }

//       case fromAuth.LOGOUT :
//             return {
//               ...state,
//               user : null,
//               errorMessage : null,
//               loading : false
//             }

//       case fromAuth.LOGIN_START :
//       case fromAuth.SIGNUP_START:
//               return {
//                 ...state,
//                 errorMessage : null,
//                 loading : true
//             }

//       case fromAuth.LOGIN_FAIL:
//               return {
//                 ...state,
//                 errorMessage : action.payload,
//                 loading : false
//             }

//       case fromAuth.CLEAR_ERROR :
//               return {
//                 ...state,
//                 errorMessage : null
//               }

//       default : return state;
//     }
// }

export const _reducer = createReducer(
  initialState,

  on(fromAuth.LoginAction , (state, action :{ user})=>{
      return {
        ...state,
        user : action.user,
        errorMessage : null,
        loading : false
      }
  }),

  on(fromAuth.LogInStartAciton,
      fromAuth.SignUpStartAciton   , (state)=>{
      return{
        ...state,
        errorMessage : null,
        loading : true
      }
  }),
   on(fromAuth.LoginFailAction , (state , action :{ errorMess})=>{
     return {
       ...state,
       errorMessage : action.errorMess,
        loading : false
     }
   }),

   on(fromAuth.LogOutAciton, (state)=>{
     return {
       ...state,
       user : null,
       errorMessage : null,
       loading : false
     }
   }),

   on(fromAuth.CLearErrorAction , (state)=>{
     return {
       ...state,
       errorMessage : null
     }
   })
);


export function authReducer(state : State , action : Action){
        return _reducer(state, action)
}
