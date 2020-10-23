import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';

import * as fromApp  from '../globalStore/app.reducer';
import * as recipesAction from '../recipes/reduxStore/recipes.action';


@Injectable({ providedIn: 'root' })
export class DataStorageService {

  URL : string = "https://recipe-book-proj-f0b03.firebaseio.com/recipes.json";

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store : Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    console.log('Saving recipes in Database')
    const recipes = this.recipeService.getRecipes();
    console.log('recipes ='+recipes)
    this.http.put(this.URL,
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }


  fetchRecipes() {
    return this.http.get<Recipe[]>(this.URL)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          //this.recipeService.setRecipes(recipes);
          this.store.dispatch(new recipesAction.SetRecipesAction(recipes));
        })
      );
  }
}
