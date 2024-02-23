import { BaseProps } from '../../../core/types/base.types';
import { User } from '../../users/types/user.types';

export type Item = {
  name: string;
  type: ItemType;
  createdBy: User;
} & BaseProps;

export type ItemType = {
  name: string;
} & BaseProps;

export type TypeStatistic = {
  itemsCount: number;
} & ItemType;

export type ItemForm = {
  id?: number;
  type: string;
  name: string;
};
