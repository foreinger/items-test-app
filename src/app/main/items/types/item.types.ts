import {BaseProps} from "../../../core/types/base.types";

export type Item = {
  name: string;
  type: Type;
} & BaseProps


export type Type = {
  name: string;
} & BaseProps

export type TypeStatistic = {
  itemCount: number;
} & Type

export type ItemForm = {
  id?: number;
  type: string;
  name: string;
};
