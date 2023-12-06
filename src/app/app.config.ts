import {importProvidersFrom} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";
import {NgrxFormsModule} from "ngrx-forms";
import {provideRouter, RouteReuseStrategy} from "@angular/router";
import {APP_ROUTES} from "./app-routes";
import {provideState, provideStore} from "@ngrx/store";
import {clearStateMetaReducer} from "./app.state";
import {AuthFeature} from "./auth/store/auth.state";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideEffects} from "@ngrx/effects";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {ErrorHandlerInterceptor} from "./core/interceptors/error.interceptor";
import * as AuthEffects from "./auth/store/auth.effects";
import * as UserEffects from "./main/users/store/users.effects";
import * as ProfileEffects from "./main/profile/store/profile.effects";
import * as ItemsEffects from "./main/items/store/items.effects";
import * as ChatEffects from "./main/chat/store/chat.effects";
import {UsersFeature} from "./main/users/store/users.state";
import {ProfileFeature} from "./main/profile/store/profile.state";
import {ItemsFeature} from "./main/items/store/items.state";
import {ChatFeature} from "./main/chat/store/chat.state";
import {AppRoutingStrategy} from "./routing-reuse-strategy";

export const appConfig = {
  providers: [
    importProvidersFrom(
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      MatDialogModule,
      NgrxFormsModule,
    ),
    provideRouter(APP_ROUTES),
    {provide: RouteReuseStrategy, useClass: AppRoutingStrategy},

    provideStore(undefined, {metaReducers: [clearStateMetaReducer]}),
    provideState(AuthFeature),
    provideState(UsersFeature),
    provideState(ProfileFeature),
    provideState(ItemsFeature),
    provideState(ChatFeature),
    provideEffects(
      AuthEffects,
      UserEffects,
      ProfileEffects,
      ItemsEffects,
      ChatEffects,
    ),
    provideStoreDevtools({
      maxAge: 50,
      trace: true,
      traceLimit: 75
    }),
    provideHttpClient(
      withInterceptors([
        AuthInterceptor,
        ErrorHandlerInterceptor]
      )
    ),
  ],
}

