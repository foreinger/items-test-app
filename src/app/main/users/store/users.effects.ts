import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { UserApiService } from '../services/user-api.service';
import { USERS_ACTIONS } from './users.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { PaginationParamsDto } from '../../../core/models/pagination.models';
import { PaginationParams } from '../../../core/types/pagination.types';
import { ActivatedRoute } from '@angular/router';

export const getUsers$ = createEffect(
  (
    store$ = inject(Store<AppState>),
    actions$ = inject(Actions),
    userApiService = inject(UserApiService),
    route = inject(ActivatedRoute),
  ) => {
    return actions$.pipe(
      ofType(USERS_ACTIONS.get),
      exhaustMap(() => {
        const paginationParams = new PaginationParamsDto(route.snapshot.queryParams as PaginationParams);
        return userApiService.getAll(paginationParams).pipe(
          map((usersPage) => USERS_ACTIONS.success({ usersPage })),
          catchError((error) => of(USERS_ACTIONS.error({ error }))),
        );
      }),
    );
  },
  { functional: true },
);
