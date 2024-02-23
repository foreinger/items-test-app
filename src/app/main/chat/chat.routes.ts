import {Routes} from "@angular/router";
import ChatPage from "./chat.page";

export const CHAT_ROUTES: Routes = [{
  path: '',
  component: ChatPage,
  children: [
    {
      path: ':id',
      loadComponent: () => import('./pages/room/room.component'),
    },
    {
      path: '',
      loadComponent: () => import('./pages/empty-chat/empty-chat.component'),
    }
  ]
}]
