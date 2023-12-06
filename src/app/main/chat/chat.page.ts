import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatChipsModule} from "@angular/material/chips";
import {MatLineModule} from "@angular/material/core";
import {AppState} from "../../app.state";
import {Store} from "@ngrx/store";
import {CHAT_ACTIONS} from "./store/chat.actions";
import {ChatFeature} from "./store/chat.state";
import {Observable} from "rxjs";
import {Room} from "./types/chats.types";
import {RoomNamePipe} from "./pipes/room-name.pipe";
import {User} from "../users/types/user.types";
import {ProfileFeature} from "../profile/store/profile.state";

@Component({
  selector: 'app-chats',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterOutlet,
    MatListModule,
    MatToolbarModule,
    MatChipsModule,
    MatLineModule,
    RouterLink,
    RoomNamePipe,
  ]
})
export default class ChatPage implements OnInit, OnDestroy {

  public rooms$: Observable<Room[] | null> = this.store$.select(ChatFeature.selectRooms);
  public me$: Observable<User | null> = this.store$.select(ProfileFeature.selectMe);

  constructor(
    private store$: Store<AppState>,
    public route: ActivatedRoute,
  ) {
  }

  public get roomId(): number | undefined {
    return Number(this.route.firstChild?.snapshot.paramMap.get('id'));
  }

  public ngOnInit(): void {
    this.getRooms();
    this.initChatConnection();

  }

  public ngOnDestroy(): void {
    this.closeChatConnection();
  }

  public getRooms(): void {
    this.store$.dispatch(CHAT_ACTIONS.getRooms());
  }

  public initChatConnection(): void {
    this.store$.dispatch(CHAT_ACTIONS.initChatListener())
  }

  public closeChatConnection(): void {
    this.store$.dispatch(CHAT_ACTIONS.closeChatListener())
  }
}
