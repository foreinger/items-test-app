import {inject, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {GuardsService} from "./core/services/guards.service";

const routes: Routes = [
  {
    path: 'items',
    canActivate: [(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(GuardsService).authGuard()],
    loadChildren: () => import('./items/items.routes').then(r => r.ITEMS_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: '',
    redirectTo: 'items',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
