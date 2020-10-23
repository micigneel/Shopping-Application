import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/globalStore/app.reducer';
import * as fromRecipeSelector from '../reduxStore/recipes.selector';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit, OnDestroy {

  recpieSub = new Subscription;
  constructor(private store : Store<fromApp.AppState>) { }

  ngOnInit() {
      this.recpieSub = this.store.select(fromRecipeSelector.getAllRecipes).subscribe(
        (recipes : Recipe[])=>{
          console.log(recipes)
        }
      );
  }

  ngOnDestroy(){
    this.recpieSub.unsubscribe();
  }

}
