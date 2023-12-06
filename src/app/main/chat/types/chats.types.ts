import {User} from "../../users/types/user.types";
import {BaseProps} from "../../../core/types/base.types";

export type Message = {
  id: number
  text: string;
  senderId: number;
} & BaseProps

export type Room = {
  id: number;
  members: User[]
  lastMessage: Message | null
} & BaseProps


export type MessageForm = {
  text: string;
  roomId: number | null;
}
