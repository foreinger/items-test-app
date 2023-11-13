import {FormModel} from "ngx-mf";
import {BaseEntity} from "../../core/interfaces/base.interfaces";

export type Item = {
  name: string;
  type: Type;
} & BaseEntity


export type Type = {
  name: string;
} & BaseEntity

export type TypeStatistic = {
  itemCount: number;
} & Type

export type ItemForm = FormModel<Pick<Item, 'name'> & { id: number | null; type: string }>;
