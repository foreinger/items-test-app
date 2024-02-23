import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, debounceTime, exhaustMap, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import {
  DELETE_ITEM_ACTIONS,
  ITEM_LIST_ACTIONS,
  ITEMS_FORM_ACTIONS,
  TYPE_STATISTIC_ACTIONS,
  TYPES_AUTOCOMPLETE_ACTIONS,
} from './items.actions';
import { ItemsApiService } from '../services/items-api.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { ItemsFeature } from './items.state';
import { CORE_ACTIONS } from '../../../core/store/core.actions';
import { PaginationParamsDto } from '../../../core/models/pagination.models';
import { ResetAction, SetValueAction } from 'ngrx-forms';
import { ITEM_FORM_DEFAULT_VALUE, ITEMS_FORMS_IDS } from '../constants/forms.constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { PaginationParams } from '../../../core/types/pagination.types';
import { ALERT_CONTENT } from '../../../core/constants/alert-content.constnant';

export const getItems$ = createEffect(
  (actions$ = inject(Actions), itemsApiService = inject(ItemsApiService), route = inject(ActivatedRoute)) => {
    return actions$.pipe(
      ofType(ITEM_LIST_ACTIONS.get),
      exhaustMap(() => {
        const paginationParams = new PaginationParamsDto(route.snapshot.queryParams as PaginationParams);
        return itemsApiService.getItems(paginationParams).pipe(
          map((itemsPage) => ITEM_LIST_ACTIONS.set({ itemsPage })),
          catchError((error) => of(ITEM_LIST_ACTIONS.error({ error }))),
        );
      }),
    );
  },
  { functional: true },
);

export const submitItemsForm$ = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store<AppState>), itemsApiService = inject(ItemsApiService)) => {
    return actions$.pipe(
      ofType(ITEMS_FORM_ACTIONS.submit),
      withLatestFrom(store$.pipe(select(ItemsFeature.selectItemForm))),
      exhaustMap(([action, form]) => {
        if (form.isInvalid) {
          return of(CORE_ACTIONS.doNothing());
        }
        return form.value.id ? [ITEMS_FORM_ACTIONS.update()] : [ITEMS_FORM_ACTIONS.create()];
      }),
    );
  },
  { functional: true },
);

export const createItem$ = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store<AppState>), itemsApiService = inject(ItemsApiService)) => {
    return actions$.pipe(
      ofType(ITEMS_FORM_ACTIONS.create),
      withLatestFrom(store$.pipe(select(ItemsFeature.selectItemForm))),
      exhaustMap(([action, form]) => {
        return itemsApiService.createItem(form.value).pipe(
          switchMap(() => {
            return [
              new SetValueAction(ITEMS_FORMS_IDS.item, ITEM_FORM_DEFAULT_VALUE),
              new ResetAction(ITEMS_FORMS_IDS.item),
              TYPES_AUTOCOMPLETE_ACTIONS.set({ typeAutocompleteOptions: null }),
              ITEM_LIST_ACTIONS.get(),
            ];
          }),
          catchError((error) => of(ITEM_LIST_ACTIONS.error({ error }))),
        );
      }),
    );
  },
  { functional: true },
);

export const updateItem$ = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store<AppState>), itemsApiService = inject(ItemsApiService)) => {
    return actions$.pipe(
      ofType(ITEMS_FORM_ACTIONS.update),
      withLatestFrom(store$.pipe(select(ItemsFeature.selectItemForm))),
      exhaustMap(([, form]) => {
        return itemsApiService.editItem(form.value).pipe(
          switchMap((item) => {
            return [
              new SetValueAction(ITEMS_FORMS_IDS.item, ITEM_FORM_DEFAULT_VALUE),
              new ResetAction(ITEMS_FORMS_IDS.item),
              TYPES_AUTOCOMPLETE_ACTIONS.set({ typeAutocompleteOptions: null }),
              ITEM_LIST_ACTIONS.updateParticular({ item }),
            ];
          }),
          catchError((error) => of(ITEM_LIST_ACTIONS.error({ error }))),
        );
      }),
    );
  },
  { functional: true },
);

export const deleteItem$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store<AppState>),
    itemsApiService = inject(ItemsApiService),
    dialog = inject(MatDialog),
  ) => {
    return actions$.pipe(
      ofType(DELETE_ITEM_ACTIONS.delete),
      switchMap(({ id }) =>
        dialog
          .open(ConfirmDialogComponent, { data: ALERT_CONTENT.deleteItem })
          .afterClosed()
          .pipe(
            filter((confirm) => confirm),
            map(() => ({ id })),
          ),
      ),
      exhaustMap(({ id }) => {
        return itemsApiService.deleteItem(id).pipe(
          map(() => ITEM_LIST_ACTIONS.get()),
          catchError((error) => of(ITEM_LIST_ACTIONS.error({ error }))),
        );
      }),
    );
  },
  { functional: true },
);

export const getTypesStatistic$ = createEffect(
  (actions$ = inject(Actions), itemsApiService = inject(ItemsApiService), route = inject(ActivatedRoute)) => {
    return actions$.pipe(
      ofType(TYPE_STATISTIC_ACTIONS.get),
      exhaustMap(() => {
        const paginationParams = new PaginationParamsDto(route.snapshot.queryParams as PaginationParams);
        return itemsApiService.getTypeStatistic(paginationParams).pipe(
          map((typesStatistic) => TYPE_STATISTIC_ACTIONS.set({ typesStatistic })),
          catchError((error) => of(TYPE_STATISTIC_ACTIONS.error({ error }))),
        );
      }),
    );
  },
  { functional: true },
);

export const getTypesAutocomplete$ = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store<AppState>), itemsApiService = inject(ItemsApiService)) => {
    return actions$.pipe(
      ofType(TYPES_AUTOCOMPLETE_ACTIONS.get),
      debounceTime(500),
      withLatestFrom(store$.pipe(select(ItemsFeature.selectItemForm))),
      exhaustMap(([, itemForm]) => {
        if (!itemForm.value.type) {
          return of(TYPES_AUTOCOMPLETE_ACTIONS.set({ typeAutocompleteOptions: null }));
        }

        return itemsApiService.getTypesAutocomplete(itemForm.value.type).pipe(
          map(({ data }) => TYPES_AUTOCOMPLETE_ACTIONS.set({ typeAutocompleteOptions: data })),
          catchError((error) => of(TYPES_AUTOCOMPLETE_ACTIONS.error({ error }))),
        );
      }),
    );
  },
  { functional: true },
);
