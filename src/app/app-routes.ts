import {inject} from '@angular/core';
import {Routes} from '@angular/router';
import {GuardsService} from "./core/services/guards.service";

export const APP_ROUTES: Routes = [
  {
    path: 'auth',
    canActivate: [() => inject(GuardsService).loggedInGuard()],
    loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: 'main',
    canActivate: [() => inject(GuardsService).authGuard()],
    loadChildren: () => import('./main/main.routes').then(r => r.MAIN_ROUTES)
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: "full"
  }
];
