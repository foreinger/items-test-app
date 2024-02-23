import { createFeature, createReducer, on } from '@ngrx/store';
import { Pagination } from '../../../core/types/pagination.types';
import { Item, ItemForm, ItemType, TypeStatistic } from '../types/item.types';
import { ITEM_LIST_ACTIONS, TYPE_STATISTIC_ACTIONS, TYPES_AUTOCOMPLETE_ACTIONS } from './items.actions';
import { createFormGroupState, FormGroupState, onNgrxForms, onNgrxFormsAction, SetValueAction } from 'ngrx-forms';
import { itemFormValidator } from './items.validators';
import { ITEM_FORM_DEFAULT_VALUE, ITEMS_FORMS_IDS } from '../constants/forms.constants';

export interface ItemsState {
  itemForm: FormGroupState<ItemForm>;
  typeAutocompleteOptions: ItemType[] | null;
  itemsPage: Pagination<Item> | null;
  typesStatistic: Pagination<TypeStatistic> | null;
}

export const PROFILE_INITIAL_STATE: ItemsState = {
  itemForm: itemFormValidator(createFormGroupState(ITEMS_FORMS_IDS.item, ITEM_FORM_DEFAULT_VALUE)),
  typeAutocompleteOptions: null,
  itemsPage: null,
  typesStatistic: null,
};

const reducer = createReducer(
  PROFILE_INITIAL_STATE,
  onNgrxForms(),
  onNgrxFormsAction(SetValueAction, (state) => itemsFormsValidators(state)),
  on(TYPES_AUTOCOMPLETE_ACTIONS.set, (state, { typeAutocompleteOptions }) => ({
    ...state,
    typeAutocompleteOptions,
  })),
  on(ITEM_LIST_ACTIONS.set, (state, { itemsPage }) => ({
    ...state,
    itemsPage,
  })),
  on(TYPE_STATISTIC_ACTIONS.set, (state, { typesStatistic }) => ({
    ...state,
    typesStatistic,
  })),
  on(ITEM_LIST_ACTIONS.updateParticular, (state, { item }) => {
    if (!state.itemsPage) {
      return state;
    }
    const itemsPage = {
      ...state.itemsPage,
      data: state.itemsPage?.data.map((curr) => (curr.id === item.id ? { ...curr, ...item } : curr)),
    };

    return {
      ...state,
      itemsPage,
    };
  }),
);

const itemsFormsValidators = (state: ItemsState) => ({
  ...state,
  itemForm: itemFormValidator(state.itemForm),
});

export const ItemsFeature = createFeature({
  name: 'Items Feature',
  reducer,
});
