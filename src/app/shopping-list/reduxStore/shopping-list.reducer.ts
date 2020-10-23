
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.action';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  ingredients : Ingredient[],
  editedIngredient : Ingredient,
  editedIngredientIndex : number
}

const initialState : State ={
  ingredients:  [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient : null,
  editedIngredientIndex : -1
};

// export function shoppingListReducer(state : State = initialState , action: any){
//     switch(action.type){
//         case ShoppingListAction.ADD_INGREDIENT :
//               return {
//                 ...state,
//                 ingredients :[...state.ingredients,action.payload ]
//               }

//         case ShoppingListAction.ADD_INGREDIENTS :

//               return {
//                 ...state,
//                 ingredients : [ ...state.ingredients , ...action.payload  ]
//               };

//         case ShoppingListAction.UPDATE_INGREDIENT :
//               const upadtedIngredients = [...state.ingredients];
//               upadtedIngredients[state.editedIngredientIndex] = action.payload;
//               return {
//                 ...state,
//                 ingredients : upadtedIngredients,
//                 editedIngredient : null,
//                 editedIngredientIndex : -1
//           };

//         case ShoppingListAction.DELTE_INGREDIENT :
//               return {
//                 ...state,
//                 ingredients :state.ingredients.filter( (ing, ingIndex)=>{
//                                  return ingIndex !== state.editedIngredientIndex;
//                       }),
//                 editedIngredient : null,
//                 editedIngredientIndex : -1
//               };

//         case ShoppingListAction.START_EDIT :
//                 return {
//                   ...state,
//                   editedIngredientIndex : action.payload,
//                   editedIngredient : {...state.ingredients[action.payload]}
//                 };

//         case ShoppingListAction.STOP_EDIT :
//                 return {
//                     ...state,
//                     editedIngredient : null,
//                     editedIngredientIndex : -1
//                 };

//         default : return state;
//     }
// }

const _reducer = createReducer(
  initialState,

  on(ShoppingListAction.AddIngredientAction, (state, action : {ingredient })=>{
    return {
      ...state,
      ingredients :[...state.ingredients,action.ingredient ]
    }
  }),

  on(ShoppingListAction.AddIngredientsAction, (state, action :{ ingredients })=>{
      return{
          ...state,
          ingredients : [...state.ingredients , ...action.ingredients]
      };
  }),

  on(ShoppingListAction.StartEditAction , (state , action : { index })=>{
      return{
        ...state,
        editedIngredientIndex : action.index,
        editedIngredient : {...state.ingredients[action.index]}
      }
  }),

  on(ShoppingListAction.UpdateIngredientAction , (state, action: { ingredient})=>{
    const updatedIngredient = [...state.ingredients];
    updatedIngredient[state.editedIngredientIndex] = action.ingredient
    return {
      ...state,
      ingredients : updatedIngredient,
      editedIngredient : null,
      editedIngredientIndex : -1
    }
  }),

  on(ShoppingListAction.StopEditAction , (state)=>{
      return {
        ...state,
        editedIngredientIndex : -1,
        editedIngredient : null
      }
  }),

  on(ShoppingListAction.DeleteIngredientAction , (state)=>{
    return {
      ...state,
      ingredients : state.ingredients.filter( (ing, index)=>{
        return index !== state.editedIngredientIndex
      }),
      editedIngredient : null,
      editedIngredientIndex : -1
    }
  })

);


export function  shoppingListReducer(state : State = initialState , action : Action){
  return _reducer(state, action);
}
