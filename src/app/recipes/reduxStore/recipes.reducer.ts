import { Recipe } from '../recipe.model';

import * as recipeActions from './recipes.action';

export interface State {
  recipes : Recipe[]
}

export const initialState : State ={
  recipes : []
}


export function RecipesReducer(state: State = initialState, action: any){

  switch(action.type){

    case recipeActions.SET_RECIPES :
      return {
        ...state,
        recipes : [...action.payload]
      }

    case recipeActions.GET_RECIPES :
      return{
        ...state
      }

    case recipeActions.ADD_RECIPE :
        return {
            ...state,
            recipes : [ ...state.recipes, action.payload]
        };

    case recipeActions.UPDATE_RECIPE:
      const updatedRecipe = [...state.recipes];
      updatedRecipe[action.payload.index] = action.payload.recipe;
      return {
          ...state,
          recipes : updatedRecipe
      };

    case recipeActions.DELETE_RECIPE:
      return {
          ...state,
          recipes : state.recipes.filter(
            (recipe, index)=>{
              return index !== action.payload
            }
          )
      };

    default : return state;
  }

}

export const getRecipes = (state : State) => state.recipes;
