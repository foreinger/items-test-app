import {importProvidersFrom, NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {ErrorHandlerInterceptor} from "./core/interceptors/error.interceptor";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    importProvidersFrom(MatDialogModule),
    provideHttpClient(
      withInterceptors([
        AuthInterceptor,
        ErrorHandlerInterceptor
      ])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
