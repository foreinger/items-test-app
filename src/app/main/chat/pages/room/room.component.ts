import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../../users/types/user.types";
import {Message, MessageForm, Room} from "../../types/chats.types";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.state";
import {CHAT_ACTIONS} from "../../store/chat.actions";
import {ChatFeature} from "../../store/chat.state";
import {LetDirective} from "@ngrx/component";
import {ProfileFeature} from "../../../profile/store/profile.state";
import {FormGroupState, NgrxFormsModule} from "ngrx-forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ScrollHandlerDirective} from "../../directives/scroll-handler.directive";
import {TextareaAutosizeDirective} from "../../../../core/directives/textarea-autosize.directive";
import {MatIconModule} from "@angular/material/icon";
import {TextAreaSubmitDirective} from "../../../../core/directives/text-area-submit.directive";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  standalone: true,
  animations: [
    trigger('messageAnimation', [
      state('void', style({transform: 'translateX(-100px)'})),
      transition(':enter', [
        animate('150ms ease-out', style({transform: 'translateX(0)'})),
      ]),
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
    TextareaAutosizeDirective,
    MatIconModule,
    TextAreaSubmitDirective,
  ],
})
export default class RoomComponent implements OnInit, OnDestroy {

  public messagesRendered = false;

  public room$: Observable<Room | null> = this.store$.select(ChatFeature.selectRoomById(this.roomId));
  public messages$: Observable<Message[] | null> = this.store$.select(ChatFeature.selectMessages);
  public me$: Observable<User | null> = this.store$.select(ProfileFeature.selectMe);
  public form$: Observable<FormGroupState<MessageForm> | null> = this.store$.select(ChatFeature.selectMessageForm);

  constructor(
    private store$: Store<AppState>,
    private route: ActivatedRoute,
  ) {
  }

  @ViewChild('chatContainerRef', {static: false}) set onMessagesRendered(chatContainer: ElementRef<HTMLDivElement> | undefined) {
    if (!chatContainer?.nativeElement) {
      return;
    }

    if (!this.messagesRendered) {
      setTimeout(() => this.messagesRendered = true, 100)
    }
  } ;

  public get roomId(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  public ngOnInit(): void {
    this.enterTheRoom();
  }

  public ngOnDestroy(): void {
    this.leaveTheRoom();
  }

  public enterTheRoom(): void {
    this.store$.dispatch(CHAT_ACTIONS.setMessageForm({roomId: this.roomId}))
    this.store$.dispatch(CHAT_ACTIONS.enterTheRoom({roomId: this.roomId}))
  }

  public leaveTheRoom(): void {
    this.store$.dispatch(CHAT_ACTIONS.leaveTheRoom({roomId: this.roomId}))
  }

  public sendMessage(): void {
    this.store$.dispatch(CHAT_ACTIONS.sendMessage());
  }
}
