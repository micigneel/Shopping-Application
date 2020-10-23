import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';


export const SET_RECIPES = 'SET_RECIPES';
export const GET_RECIPES = 'GET_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const ADD_RECIPE ='ADD_RECIPE';
export const UPDATE_RECIPE ='UPDATE_RECIPE';
export const DELETE_RECIPE ='DELETE_RECIPE';

export const SAVE_RECIPES ='SAVE_RECIPES';

export class SetRecipesAction implements Action{
  readonly type : string = SET_RECIPES;

  constructor( public payload : Recipe[]){}
}

export class GetRecipesAction implements Action{
  readonly type : string = GET_RECIPES;
}

export class FetchRecipesAction implements Action{
  readonly type : string = FETCH_RECIPES;
}

export class AddRecipeAction implements Action{
  readonly type : string = ADD_RECIPE;

  constructor(public payload : Recipe){}
}

export class UpdateRecipeAction implements Action{
  readonly type : string = UPDATE_RECIPE;

  constructor(public payload : {recipe : Recipe , index : number}){}
}

export class DeleteRecipeAction implements Action{
  readonly type : string = DELETE_RECIPE;

  constructor(public payload : number){}
}

export class SaveRecipesAcion implements Action{
  readonly type : string = SAVE_RECIPES;
}

