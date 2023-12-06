import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {CHAT_ACTIONS} from "./chat.actions";
import {catchError, exhaustMap, filter, map, of, switchMap, withLatestFrom} from "rxjs";
import {ChatApiService} from "../services/chat-api.service";
import {ChatSocketService} from "../services/chat-socket.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.state";
import {ChatFeature} from "./chat.state";
import {SetValueAction} from "ngrx-forms";
import {CHAT_FORMS_IDS} from "../constants/forms.constants";
import {Router} from "@angular/router";


export const initRoom$ = createEffect(
  (
    actions$ = inject(Actions),
    chatApiService = inject(ChatApiService),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(CHAT_ACTIONS.initRoom),
      exhaustMap(({userId}) => chatApiService.initRoom(userId)
        .pipe(
          switchMap(({id}) => router.navigate(['main', 'chat', id])),
          catchError((error) => of(CHAT_ACTIONS.error({error})))
        )
      )
    );
  },
  {functional: true, dispatch: false}
);
export const getRooms$ = createEffect(
  (
    actions$ = inject(Actions),
    chatApiService = inject(ChatApiService)
  ) => {
    return actions$.pipe(
      ofType(CHAT_ACTIONS.getRooms),
      exhaustMap(() => {
          return chatApiService.getRooms()
            .pipe(
              map((rooms) => CHAT_ACTIONS.setRooms({rooms})),
              catchError((error) => of(CHAT_ACTIONS.error({error})))
            )
        }
      )
    );
  },
  {functional: true}
);

export const initChatListener$ = createEffect(
  (
    actions$ = inject(Actions),
    chatSocketService = inject(ChatSocketService)
  ) => {
    return actions$.pipe(
      ofType(CHAT_ACTIONS.initChatListener),
      map(() => chatSocketService.initSocketConnection()),
      switchMap(() => chatSocketService.listenToRoomsUpdate()),
      map((room) => CHAT_ACTIONS.updateRooms({room})),
      catchError((error) => of(CHAT_ACTIONS.error({error})))
    );
  },
  {functional: true}
);

export const closeChatListener$ = createEffect(
  (
    actions$ = inject(Actions),
    chatSocketService = inject(ChatSocketService)
  ) => {
    return actions$.pipe(
      ofType(CHAT_ACTIONS.closeChatListener),
      map(() => chatSocketService.closeSocketConnection()),
      catchError((error) => of(CHAT_ACTIONS.error({error})))
    );
  },
  {functional: true, dispatch: false}
);


export const enterTheRoom$ = createEffect(
  (
    actions$ = inject(Actions),
    chatSocketService = inject(ChatSocketService)
  ) => {
    return actions$.pipe(
      ofType(CHAT_ACTIONS.enterTheRoom),
      switchMap(({roomId}) => chatSocketService.joinRoom(roomId)),
      switchMap(() => chatSocketService.listenToMessages()),
      map((message) => CHAT_ACTIONS.messageReceived({message})),
      catchError((error) => of(CHAT_ACTIONS.error({error})))
    );
  },
  {functional: true}
);

export const loadMessages$ = createEffect(
  (
    actions$ = inject(Actions),
    chatApiService = inject(ChatApiService),
  ) => {
    return actions$.pipe(
      ofType(CHAT_ACTIONS.enterTheRoom),
      switchMap(({roomId}) => {
        return chatApiService.getMessages(roomId).pipe(
          map((messages) => CHAT_ACTIONS.setMessages({messages})),
          catchError((error) => of(CHAT_ACTIONS.error({error})))
        )
      }),
    );
  },
  {functional: true}
);

export const leaveTheRoom$ = createEffect(
  (
    actions$ = inject(Actions),
    chatSocketService = inject(ChatSocketService)
  ) => {
    return actions$.pipe(
      ofType(CHAT_ACTIONS.leaveTheRoom),
      switchMap(({roomId}) => chatSocketService.leaveRoom(roomId)),
      catchError((error) => of(CHAT_ACTIONS.error({error})))
    );
  },
  {functional: true, dispatch: false}
);

export const sendMessage$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store<AppState>),
    chatSocketService = inject(ChatSocketService)
  ) => {
    return actions$.pipe(
      ofType(CHAT_ACTIONS.sendMessage),
      withLatestFrom(store$.select(ChatFeature.selectMessageForm)),
      filter(([, form]) => Boolean(form?.isValid)),
      map(([, form]) => {
          chatSocketService.sendMessage(form!.value);
          return new SetValueAction(CHAT_FORMS_IDS.message, {...form?.value, text: ''})
        }
      ),
      catchError((error) => of(CHAT_ACTIONS.error({error})))
    );
  },
  {functional: true}
);

