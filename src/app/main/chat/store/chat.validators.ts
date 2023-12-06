import {FormGroupState, updateGroup, validate} from "ngrx-forms";
import {required} from "ngrx-forms/validation";
import {MessageForm} from "../types/chats.types";

export const messageFormValidator = (state: FormGroupState<MessageForm> | null): FormGroupState<MessageForm> | null => {

  if (!state) {
    return null;
  }

  return updateGroup<MessageForm>(state, {
    text: validate(required),
    roomId: validate(required),
  })
};


