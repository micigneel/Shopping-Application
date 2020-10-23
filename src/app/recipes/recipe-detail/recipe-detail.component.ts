import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/globalStore/app.reducer';
import * as recipeActions from '../reduxStore/recipes.action';
import * as shoppingListActions from '../../shopping-list/reduxStore/shopping-list.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store : Store<fromApp.AppState>) {
  }

  ngOnInit() {
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.id = +params['id'];
    //       this.recipe = this.recipeService.getRecipe(this.id);
    //     }
    //   );

      this.route.params.pipe(
        map( params =>{
          return +params['id'];
        }),
        switchMap(
          id =>{
            this.id = id;
            return this.store.select('recipes');
          }
        ),
        map(
          recipeSate =>{
            return recipeSate.recipes.find(
              (recipe , index) =>{
                return this.id === index
              }
            )
          }
        )
      )
      .subscribe(
        recipe =>{
          this.recipe = recipe;
        }
      );
  }

  onAddToShoppingList() {
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(shoppingListActions.AddIngredientsAction({ ingredients : this.recipe.ingredients}));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    //this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new recipeActions.DeleteRecipeAction(this.id))
    this.router.navigate(['/recipes']);
  }

}
