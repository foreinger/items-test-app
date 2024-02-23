import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Message, Room} from "../types/chats.types";


export const CHAT_ACTIONS = createActionGroup({
  source: 'Chat Feature',
  events: {
    initRoom: props<{ userId: string | null }>(),
    getRooms: emptyProps(),
    setRooms: props<{ rooms: Room[] }>(),
    updateRooms: props<{ room: Room }>(),
    error: props<{ error: string }>(),

    initChatListener: emptyProps(),
    closeChatListener: emptyProps(),

    enterTheRoom: props<{ roomId: string | null }>(),
    leaveTheRoom: props<{ roomId: string | null }>(),

    setMessageForm: props<{ roomId: string | null }>(),
    sendMessage: emptyProps(),
    messageReceived: props<{ message: Message }>(),

    setMessages: props<{ messages: Message[] }>(),
  },
});

