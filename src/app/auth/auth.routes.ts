import {Routes} from "@angular/router";
import {AuthPage} from "./auth.page";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component')
      },
      {
        path: 'registration',
        loadComponent: () => import('./pages/registration/registration.component')
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
];
