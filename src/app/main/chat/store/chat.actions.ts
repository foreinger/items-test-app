import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Message, Room} from "../types/chats.types";


export const CHAT_ACTIONS = createActionGroup({
  source: 'Chat Feature',
  events: {
    initRoom: props<{ userId: number }>(),
    getRooms: emptyProps(),
    setRooms: props<{ rooms: Room[] }>(),
    updateRooms: props<{ room: Room }>(),
    error: props<{ error: string }>(),

    initChatListener: emptyProps(),
    closeChatListener: emptyProps(),

    enterTheRoom: props<{ roomId: number }>(),
    leaveTheRoom: props<{ roomId: number }>(),

    setMessageForm: props<{ roomId: number }>(),
    sendMessage: emptyProps(),
    messageReceived: props<{ message: Message }>(),

    setMessages: props<{ messages: Message[] }>(),
  },
});

