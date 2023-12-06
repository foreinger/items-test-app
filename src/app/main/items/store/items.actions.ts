import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {PaginationParamsDto} from "../../../core/models/pagination.models";
import {Pagination} from "../../../core/types/pagination.types";
import {Item, TypeStatistic} from "../types/item.types";


export const ITEMS_FORM_ACTIONS = createActionGroup({
  source: 'Items From',
  events: {
    submit: emptyProps(),
    success: emptyProps(),
    error: props<{ error: string }>(),
  },
});

export const ITEM_LIST_ACTIONS = createActionGroup({
  source: 'Get Items list',
  events: {
    get: props<{ paginationData?: PaginationParamsDto }>(),
    set: props<{ itemsPage: Pagination<Item> }>(),
    error: props<{ error: string }>(),
  },
});

export const DELETE_ITEM_ACTIONS = createActionGroup({
  source: 'Delete Item',
  events: {
    delete: props<{ id: number }>(),
    success: emptyProps(),
    error: props<{ error: string }>(),
  },
});

export const TYPE_LIST_ACTIONS = createActionGroup({
  source: 'Get Types list',
  events: {
    get: props<{ paginationData?: PaginationParamsDto }>(),
    set: props<{ typesPage: Pagination<TypeStatistic> }>(),
    error: props<{ error: string }>(),
  },
});
