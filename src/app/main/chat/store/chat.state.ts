import {createFeature, createReducer, createSelector, on} from '@ngrx/store';
import {Message, MessageForm, Room} from "../types/chats.types";
import {CHAT_ACTIONS} from "./chat.actions";
import {createFormGroupState, FormGroupState, onNgrxForms, onNgrxFormsAction, SetValueAction} from "ngrx-forms";
import {messageFormValidator} from "./chat.validators";
import {CHAT_FORMS_IDS} from "../constants/forms.constants";

export interface ChatState {

  rooms: Room[] | null;
  messages: Message[] | null;
  messageForm: FormGroupState<MessageForm> | null;
}

export const CHAT_INITIAL_STATE: ChatState = {
  rooms: null,
  messages: null,
  messageForm: null,
}

const reducer = createReducer(
  CHAT_INITIAL_STATE,
  onNgrxForms(),
  onNgrxFormsAction(SetValueAction, (state) => chatFormsValidators(state)),
  on(CHAT_ACTIONS.setRooms,
    (state, {rooms}) => ({
      ...state,
      rooms
    })
  ),
  on(CHAT_ACTIONS.updateRooms,
    (state, {room}) => {
      // Sort in descending order (newest first)
      const updateRoom = (roomData: Room) => roomData.id === room.id ? room : roomData;
      const sortByUpdatedAt = (a: Room, b: Room) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();

      return {
        ...state,
        rooms: state.rooms?.map(updateRoom).sort(sortByUpdatedAt) ?? []
      }
    }
  ),
  on(CHAT_ACTIONS.setMessages,
    (state, {messages}) => ({
      ...state,
      messages
    })
  ),
  on(CHAT_ACTIONS.messageReceived,
    (state, {message}) => {
      const messages = state.messages ?? [];
      return {...state, messages: [...messages, message]}
    }
  ),
  on(CHAT_ACTIONS.setMessageForm,
    (state, {roomId}) => {
      return {
        ...state,
        messageForm: messageFormValidator(createFormGroupState(CHAT_FORMS_IDS.message, {roomId, text: ''}))
      }
    }
  ),
)

const chatFormsValidators = (state: ChatState) => ({
  ...state,
  messageForm: messageFormValidator(state.messageForm),
})

export const ChatFeature = createFeature({
  name: 'Chat Feature', reducer,
  extraSelectors: (chatFeature) => ({
    selectRoomById: (roomId: number) => createSelector(
      chatFeature.selectRooms,
      (rooms) => rooms?.find(room => room?.id === roomId) ?? null
    ),
  }),
})
