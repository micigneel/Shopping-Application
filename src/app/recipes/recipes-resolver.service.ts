import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import * as recipeActions from '../recipes/reduxStore/recipes.action';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService,
    private store : Store<fromApp.AppState>,
    private actions$ : Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //const recipes = this.recipesService.getRecipes();
    let recipes = [];
    this.store.select('recipes').subscribe(
      recipeState =>{
          recipes = recipeState.recipes;
      }
    );

    if (recipes.length === 0) {
      //return this.dataStorageService.fetchRecipes();
      this.store.dispatch(new recipeActions.FetchRecipesAction());
      return this.actions$.pipe(
        ofType(recipeActions.SET_RECIPES),
        take(1)
      );

    } else {
      return recipes;
    }
  }
}
