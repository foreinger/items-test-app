import {FormModel} from "ngx-mf";
import {BaseEntity} from "../../core/types/base.types";

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
