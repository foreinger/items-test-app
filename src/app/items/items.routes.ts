import {Routes} from "@angular/router";
import {ItemsPage} from "./items.page";

export const ITEMS_ROUTES: Routes = [
  {
    path: '',
    component: ItemsPage,
    children: [
      {
        path: 'list',
        title: '',
        loadComponent: () => import('./pages/item-list/item-list.component')
      },
      {
        path: 'statistic',
        loadComponent: () => import('./pages/item-statistic/item-statistic.component')
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  },
];
