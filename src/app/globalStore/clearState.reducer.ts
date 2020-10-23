import * as authActions from '../auth/reduxStore/auth.action';

export function clearState(reducer) {
  return  (state, action) =>{

    if (action.type === authActions.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}


