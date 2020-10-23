import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as recipeActions from './recipes.action';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/globalStore/app.reducer';


@Injectable()
export class RecipeEffect {
  URL : string = "https://recipe-book-proj-f0b03.firebaseio.com/recipes.json";

  constructor(private actions : Actions,
              private http : HttpClient,
              private store : Store<fromApp.AppState>){}


  //Fetching from server
  @Effect()
  fetchRecipes = this.actions.pipe(
    ofType(recipeActions.FETCH_RECIPES),
    switchMap (
      ()=>{
        return this.http.get<Recipe[]>(this.URL);
      }
    ),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(
      (recipes : Recipe[])=>{
        return new recipeActions.SetRecipesAction(recipes);
      }
    )
  )

  //Setting on server
  @Effect({ dispatch : false})
  saveRecipes = this.actions.pipe(
    ofType(recipeActions.SAVE_RECIPES),
    withLatestFrom( this.store.select('recipes') ),
    switchMap(
      ([actionData, recipeState])=>{
       return  this.http.put(this.URL,
          recipeState.recipes
        );
      }
    )
  );

}
