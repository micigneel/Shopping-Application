import { Action, createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const DELTE_INGREDIENT ='DELTE_INGREDIENT';
export const UPDATE_INGREDIENT ='UPDATE_INGREDIENT';
export const START_EDIT ='START_EDIT';
export const STOP_EDIT ='STOP_EDIT';


// export class AddIngredientAction implements Action{
//     readonly type : string = ADD_INGREDIENT;

//     constructor(public payload :Ingredient){}
// }


// export class AddIngredientsAction implements Action{
//   readonly type : string = ADD_INGREDIENTS;

//   constructor(public payload : Ingredient[] ){
//   }

// }

// export class UpdateIngredientAction implements Action{
//   readonly type : string = UPDATE_INGREDIENT;

//   constructor(public payload : Ingredient){
//   }

// }

// export class StartEditAction implements Action{
//   readonly type : string = START_EDIT;

//   constructor(public payload :number){}
// }

// export class StopEditAction implements Action{
//   readonly type : string = STOP_EDIT;
// }

// export class DeleteIngredientAction implements Action{
//   readonly type : string = DELTE_INGREDIENT;

// }


export const AddIngredientAction = createAction(
  ADD_INGREDIENT,
  props<{ingredient : Ingredient}>()
);

export const AddIngredientsAction = createAction(
  ADD_INGREDIENTS,
  props<{ingredients : Ingredient[]}>()
);

export const UpdateIngredientAction = createAction(
  UPDATE_INGREDIENT,
  props<{ingredient : Ingredient}>()
);

export const StartEditAction = createAction(
  START_EDIT,
  props<{ index : number }>()
);

export const StopEditAction = createAction(
  STOP_EDIT
);

export const DeleteIngredientAction = createAction(DELTE_INGREDIENT);


