import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild     } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../reduxStore/shopping-list.action';
import * as fromApp from '../../globalStore/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService,
              private store : Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.subscription = this.slService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.slService.getIngredient(index);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       })
    //     }
    //   );
      this.subscription = this.store.select('shoppingList').subscribe(
        storeData =>{
          if(storeData.editedIngredientIndex > -1){
            this.editMode = true;
            this.editedItem = storeData.editedIngredient;
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      //his.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(ShoppingListAction.UpdateIngredientAction( { ingredient : newIngredient} ));
    } else {
      //this.slService.addIngredient(newIngredient);
      // this.store.dispatch(new ShoppingListAction.AddIngredientAction(newIngredient));
      this.store.dispatch( ShoppingListAction.AddIngredientAction({ ingredient :newIngredient}));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListAction.StopEditAction());
  }

  onDelete() {
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(ShoppingListAction.DeleteIngredientAction());
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(ShoppingListAction.StopEditAction());
    this.subscription.unsubscribe();

  }

}
