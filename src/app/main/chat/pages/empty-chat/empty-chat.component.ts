import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Room } from '../../types/chats.types';
import { ChatFeature } from '../../store/chat.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import {LetDirective} from "@ngrx/component";

@Component({
  selector: 'app-empty-chat',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, LetDirective],
  templateUrl: './empty-chat.component.html',
  styleUrl: './empty-chat.component.scss',
})
export default class EmptyChatComponent {
  public rooms$: Observable<Room[] | null> = this.store$.select(ChatFeature.selectRooms);

  constructor(private store$: Store<AppState>) {}
}
