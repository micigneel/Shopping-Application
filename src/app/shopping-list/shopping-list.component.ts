import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as ShoppingListAction from './reduxStore/shopping-list.action';
import * as fromApp from '../globalStore/app.reducer';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients : Ingredient[]}> ;
  private subscription: Subscription;

  constructor(private slService: ShoppingListService,
              private store : Store<fromApp.AppState>) { }

  ngOnInit() {

    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
  }

  onEditItem(index: number) {
    //this.slService.startedEditing.next(index);
    if(index > -1){
      this.store.dispatch(ShoppingListAction.StartEditAction({index: index}));
    }
  }

  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }
}
