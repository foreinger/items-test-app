import {Routes} from "@angular/router";
import MainPage from "./main.page";

export const MAIN_ROUTES: Routes = [{
  path: '',
  component: MainPage,
  children: [
    {
      path: 'items',
      loadChildren: () => import('./items/items.routes').then((r) => r.ITEMS_ROUTES),
    },
    {
      path: 'chat',
      loadChildren: () => import('./chat/chat.routes').then((r) => r.CHAT_ROUTES),
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.routes').then((r) => r.USERS_ROUTES),
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'items'
    }
  ]
}]
