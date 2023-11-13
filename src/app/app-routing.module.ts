import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'items',
    loadChildren: () => import('./items/items.routes').then(r => r.ITEMS_ROUTES)
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
