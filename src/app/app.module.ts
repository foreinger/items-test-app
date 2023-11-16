import {importProvidersFrom, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {ErrorHandlerInterceptor} from "./core/interceptors/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
