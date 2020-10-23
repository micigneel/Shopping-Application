import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import * as authAction from '../auth/reduxStore/auth.action';
import * as recipeActions from '../recipes/reduxStore/recipes.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store : Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.userSub = this.authService.user.subscribe(user => {
    //   this.isAuthenticated = !!user;
    //   console.log(!user);
    //   console.log(!!user);
    // });

    this.userSub = this.store.select('auth').subscribe(
      authState =>{
        this.isAuthenticated = !!authState.user;
      }
    );
  }

  onSaveData() {
    //this.dataStorageService.storeRecipes();
    this.store.dispatch(new recipeActions.SaveRecipesAcion());
  }

  onFetchData() {
   // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new recipeActions.FetchRecipesAction());
  }


  onLogout() {
    //this.authService.logout();
    this.store.dispatch(authAction.LogOutAciton());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
