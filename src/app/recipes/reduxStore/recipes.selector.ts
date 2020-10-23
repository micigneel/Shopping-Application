import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from 'src/app/globalStore/app.reducer';
import * as fromRecipe from '../reduxStore/recipes.reducer';



export const recipeState  = createFeatureSelector<fromApp.AppState, fromRecipe.State>('recipes');


export const getAllRecipes = createSelector(
  recipeState,
 fromRecipe.getRecipes
);
