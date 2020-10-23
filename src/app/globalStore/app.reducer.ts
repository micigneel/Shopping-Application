import * as fromShoppingList from '../shopping-list/reduxStore/shopping-list.reducer';
import * as fromAuth from '../auth/reduxStore/auth.reducer';
import * as fromRecipes from '../recipes/reduxStore/recipes.reducer';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
  shoppingList : fromShoppingList.State
  auth : fromAuth.State,
  recipes : fromRecipes.State
}

export const appReducer : ActionReducerMap<AppState> ={
  shoppingList : fromShoppingList.shoppingListReducer,
  auth : fromAuth.authReducer,
  recipes : fromRecipes.RecipesReducer
}
