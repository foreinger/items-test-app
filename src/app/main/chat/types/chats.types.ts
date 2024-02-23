import { User } from '../../users/types/user.types';
import { BaseProps } from '../../../core/types/base.types';

export type Message = {
  text: string;
  senderId: number;
} & BaseProps;

export type Room = {
  members: User[];
  lastMessage: Message | null;
} & BaseProps;

export type MessageForm = {
  text: string;
  roomId: string | null;
};

export type MessagesByDate = {
  dateLabel: string;
  messages: Message[];
};
