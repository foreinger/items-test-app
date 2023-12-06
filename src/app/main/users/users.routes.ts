import {Routes} from "@angular/router";
import {UsersPage} from "./users.page";

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersPage,
    children: [
      {
        path: 'list',
        loadComponent: () => import('./pages/users-list/users-list.component')
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  },
];
