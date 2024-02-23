import { Component, ElementRef, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../users/types/user.types';
import { Message, MessageForm, MessagesByDate, Room } from '../../types/chats.types';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { CHAT_ACTIONS } from '../../store/chat.actions';
import { ChatFeature } from '../../store/chat.state';
import { LetDirective } from '@ngrx/component';
import { ProfileFeature } from '../../../profile/store/profile.state';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ScrollHandlerDirective } from '../../directives/scroll-handler.directive';
import { MatIconModule } from '@angular/material/icon';
import { TextAreaSubmitDirective } from '../../../../core/directives/text-area-submit.directive';
import { DateTime } from 'luxon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  standalone: true,
  animations: [
    trigger('messageAnimation', [
      state('void', style({ right: '120px', top: '100%' })),
      transition(':enter', [animate('300ms ease-in-out', style({ right: '0px', top: '0px' }))]),
    ]),
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    LetDirective,
    NgrxFormsModule,
    ScrollHandlerDirective,
    RouterLink,
    MatIconModule,
    TextAreaSubmitDirective,
    MatChipsModule,
  ],
})
export default class RoomComponent implements OnInit, OnDestroy {
  public room$: Observable<Room | null> = this.store$.select(ChatFeature.selectRoomById(this.roomId));
  public messagesByDays$: Observable<MessagesByDate[] | null> = this.store$
    .select(ChatFeature.selectMessages)
    .pipe(map(this.splitMessageByDates));
  public me$: Observable<User | null> = this.store$.select(ProfileFeature.selectMe);
  public form$: Observable<FormGroupState<MessageForm> | null> = this.store$.select(ChatFeature.selectMessageForm);

  public animationsDisabled: boolean = true;

  constructor(
    private store$: Store<AppState>,
    private route: ActivatedRoute,
  ) {}

  @ViewChild('chatContainerRef', { static: false }) set onMessagesRendered(
    chatContainer: ElementRef<HTMLDivElement> | undefined,
  ) {
    if (!chatContainer?.nativeElement) return;

    if (this.animationsDisabled) {
      setTimeout(() => (this.animationsDisabled = false), 100);
    }
  }

  public get roomId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  public ngOnInit(): void {
    this.enterTheRoom();
  }

  public ngOnDestroy(): void {
    this.leaveTheRoom();
  }

  public enterTheRoom(): void {
    this.store$.dispatch(CHAT_ACTIONS.setMessageForm({ roomId: this.roomId }));
    this.store$.dispatch(CHAT_ACTIONS.enterTheRoom({ roomId: this.roomId }));
  }

  public leaveTheRoom(): void {
    this.store$.dispatch(CHAT_ACTIONS.leaveTheRoom({ roomId: this.roomId }));
  }

  public sendMessage(): void {
    this.store$.dispatch(CHAT_ACTIONS.sendMessage());
  }

  private splitMessageByDates(messages: Message[] | null): MessagesByDate[] {
    const groupedMessages = messages?.reduce((grouped: { [key: string]: Message[] }, message: Message) => {
      const date = DateTime.fromISO(message.created_at);
      const dayLabel = date.toFormat('dd MMMM yyyy');
      if (dayLabel in grouped) {
        grouped[dayLabel].push(message);
      } else {
        grouped[dayLabel] = [message];
      }
      return grouped;
    }, {});

    return Object.entries(groupedMessages ?? {}).map(([dateLabel, messages]) => ({ dateLabel, messages }));
  }

  protected readonly signal = signal;
}
