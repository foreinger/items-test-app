import {createFeature, createReducer, on} from '@ngrx/store';
import {Pagination} from "../../../core/types/pagination.types";
import {Item, ItemForm, TypeStatistic} from "../types/item.types";
import {ITEM_LIST_ACTIONS, TYPE_LIST_ACTIONS} from "./items.actions";
import {createFormGroupState, FormGroupState, onNgrxForms, onNgrxFormsAction, SetValueAction} from "ngrx-forms";
import {itemFormValidator} from "./items.validators";
import {ITEM_FORM_DEFAULT_VALUE, ITEMS_FORMS_IDS} from "../constants/forms.constants";

export interface ItemsState {
  itemForm: FormGroupState<ItemForm>;
  itemsPage: Pagination<Item> | null;
  typesPage: Pagination<TypeStatistic> | null;
}

export const PROFILE_INITIAL_STATE: ItemsState = {
  itemForm: itemFormValidator(createFormGroupState(ITEMS_FORMS_IDS.item, ITEM_FORM_DEFAULT_VALUE)),
  itemsPage: null,
  typesPage: null,
}

const reducer = createReducer(
  PROFILE_INITIAL_STATE,
  onNgrxForms(),
  onNgrxFormsAction(SetValueAction, (state) => itemsFormsValidators(state)),
  on(ITEM_LIST_ACTIONS.set,
    (state, {itemsPage}) => ({
      ...state,
      itemsPage
    })
  ),
  on(TYPE_LIST_ACTIONS.set,
    (state, {typesPage}) => ({
      ...state,
      typesPage
    })
  ),
)

const itemsFormsValidators = (state: ItemsState) => ({
  ...state,
  itemForm: itemFormValidator(state.itemForm),
})

export const ItemsFeature = createFeature({
  name: 'Items Feature', reducer,
})
