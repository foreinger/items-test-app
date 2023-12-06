import {MessageForm} from "../types/chats.types";

export const CHAT_FORMS_IDS = {
  message: 'MESSAGE_FORM_ID',
}

export const MESSAGE_FORM_DEFAULT_VALUE: MessageForm = {
  text: '',
  roomId: null,
}
