import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {catchError, exhaustMap, filter, map, of, switchMap, withLatestFrom} from "rxjs";
import {DELETE_ITEM_ACTIONS, ITEM_LIST_ACTIONS, ITEMS_FORM_ACTIONS, TYPE_LIST_ACTIONS} from "./items.actions";
import {ItemsApiService} from "../services/items-api.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../app.state";
import {ItemsFeature} from "./items.state";
import {CORE_ACTIONS} from "../../../core/store/core.actions";
import {PaginationParamsDto} from "../../../core/models/pagination.models";
import {ResetAction, SetValueAction} from "ngrx-forms";
import {ITEM_FORM_DEFAULT_VALUE, ITEMS_FORMS_IDS} from "../constants/forms.constants";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";

export const getItems$ = createEffect(
  (
    actions$ = inject(Actions),
    itemsApiService = inject(ItemsApiService)
  ) => {
    return actions$.pipe(
      ofType(ITEM_LIST_ACTIONS.get),
      exhaustMap(({paginationData}) => {
          const payload = paginationData ? new PaginationParamsDto(paginationData) : undefined;
          return itemsApiService.getItems(payload)
            .pipe(
              map((itemsPage) => ITEM_LIST_ACTIONS.set({itemsPage})),
              catchError((error) => of(ITEM_LIST_ACTIONS.error({error})))
            )
        }
      )
    );
  },
  {functional: true}
);
export const submitItemsForm$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store<AppState>),
    itemsApiService = inject(ItemsApiService)
  ) => {
    return actions$.pipe(
      ofType(ITEMS_FORM_ACTIONS.submit),
      withLatestFrom(store$.pipe(select(ItemsFeature.selectItemForm))),
      exhaustMap(([action, form]) => {
          if (form.isInvalid) {
            return of(CORE_ACTIONS.doNothing())
          }

          return (form.value.id
            ? itemsApiService.editItem(form.value)
            : itemsApiService.createItem(form.value))
            .pipe(
              withLatestFrom(store$.pipe(select(ItemsFeature.selectItemsPage))),
              switchMap(([res, currentPage]) => {
                const paginationData = currentPage ? new PaginationParamsDto(currentPage) : undefined;
                return [
                  new SetValueAction(ITEMS_FORMS_IDS.item, ITEM_FORM_DEFAULT_VALUE),
                  new ResetAction(ITEMS_FORMS_IDS.item),
                  ITEM_LIST_ACTIONS.get({paginationData})
                ]
              }),
              catchError((error) => of(ITEM_LIST_ACTIONS.error({error})))
            )
        }
      )
    );
  },
  {functional: true}
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
      switchMap(({id}) => dialog.open(ConfirmDialogComponent).afterClosed()
        .pipe(
          filter((confirm) => confirm),
          map(() => ({id}))
        )),
      exhaustMap(({id}) => {

          return itemsApiService.deleteItem(id)
            .pipe(
              withLatestFrom(store$.pipe(select(ItemsFeature.selectItemsPage))),
              map(([res, currentPage]) => {
                const paginationData = currentPage ? new PaginationParamsDto(currentPage) : undefined;
                return ITEM_LIST_ACTIONS.get({paginationData})
              }),
              catchError((error) => of(ITEM_LIST_ACTIONS.error({error})))
            )
        }
      )
    );
  },
  {functional: true}
);

export const getTypes$ = createEffect(
  (
    actions$ = inject(Actions),
    itemsApiService = inject(ItemsApiService)
  ) => {
    return actions$.pipe(
      ofType(TYPE_LIST_ACTIONS.get),
      exhaustMap(({paginationData}) => {
          const payload = paginationData ? new PaginationParamsDto(paginationData) : undefined;
          return itemsApiService.getStatistic(payload)
            .pipe(
              map((typesPage) => TYPE_LIST_ACTIONS.set({typesPage})),
              catchError((error) => of(TYPE_LIST_ACTIONS.error({error})))
            )
        }
      )
    );
  },
  {functional: true}
);
