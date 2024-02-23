import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Pagination } from '../../../core/types/pagination.types';
import { Item, ItemType, TypeStatistic } from '../types/item.types';

export const ITEMS_FORM_ACTIONS = createActionGroup({
  source: 'Items From',
  events: {
    submit: emptyProps(),
    create: emptyProps(),
    update: emptyProps(),
    error: props<{ error: string }>(),
  },
});

export const TYPES_AUTOCOMPLETE_ACTIONS = createActionGroup({
  source: 'Get Existed Types Autocomplete',
  events: {
    get: emptyProps(),
    set: props<{ typeAutocompleteOptions: ItemType[] | null }>(),
    error: props<{ error: string }>(),
  },
});

export const ITEM_LIST_ACTIONS = createActionGroup({
  source: 'Get Items list',
  events: {
    get: emptyProps(),
    set: props<{ itemsPage: Pagination<Item> }>(),
    updateParticular: props<{ item: Item }>(),
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

export const TYPE_STATISTIC_ACTIONS = createActionGroup({
  source: 'Get Types list',
  events: {
    get: emptyProps(),
    set: props<{ typesStatistic: Pagination<TypeStatistic> }>(),
    error: props<{ error: string }>(),
  },
});
