import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import * as fromApp from '../app/globalStore/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/reduxStore/auth.effects';
import { environment } from '../environments/environment';
import { RecipeEffect } from './recipes/reduxStore/recipes.effects';
import { clearState } from './globalStore/clearState.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer , { metaReducers : [clearState]}),
    EffectsModule.forRoot([AuthEffects, RecipeEffect]),
    StoreDevtoolsModule.instrument({
      logOnly : environment.production
    }),
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
