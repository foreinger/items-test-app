import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { PROFILE_ACTIONS } from './profile.actions';
import { catchError, exhaustMap, filter, map, of, switchMap } from 'rxjs';
import { StorageService } from '../../../core/services/storage.service';
import { CORE_ACTIONS } from '../../../core/store/core.actions';
import { Router } from '@angular/router';
import { ProfileApiService } from '../services/profile-api.service';
import { ConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ALERT_CONTENT } from '../../../core/constants/alert-content.constnant';

export const getMe$ = createEffect(
  (actions$ = inject(Actions), profileApiService = inject(ProfileApiService)) => {
    return actions$.pipe(
      ofType(PROFILE_ACTIONS.getMe),
      exhaustMap(() => {
        return profileApiService.getMe().pipe(
          map((me) => PROFILE_ACTIONS.setMe({ me })),
          catchError((error) => of(PROFILE_ACTIONS.error({ error }))),
        );
      }),
    );
  },
  { functional: true },
);

export const logout$ = createEffect(
  (
    actions$ = inject(Actions),
    storage = inject(StorageService),
    router = inject(Router),
    dialog = inject(MatDialog),
  ) => {
    return actions$.pipe(
      ofType(PROFILE_ACTIONS.logOut),
      switchMap(() =>
        dialog
          .open(ConfirmDialogComponent, { data: ALERT_CONTENT.logout })
          .afterClosed()
          .pipe(filter((confirm) => confirm)),
      ),
      map(() => {
        storage.clearStorage();
        router.navigateByUrl('/auth/login');
        return CORE_ACTIONS.clearAppState();
      }),
    );
  },
  { functional: true },
);
