import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, of, withLatestFrom} from 'rxjs';
import {LOGIN_ACTIONS, REGISTRATION_ACTIONS} from "./auth.actions";
import {AuthFeature} from "./auth.state";
import {Action, select, Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {CORE_ACTIONS} from "../../core/store/core.actions";
import {StorageKeys} from "../../core/enums/storage-keys.enum";
import {StorageService} from "../../core/services/storage.service";
import {Router} from "@angular/router";
import {AuthApiService} from "../services/auth-api.service";
import {PROFILE_ACTIONS} from "../../main/profile/store/profile.actions";
import {SetErrorsAction} from "ngrx-forms";
import {AUTH_FORMS_IDS} from "../constants/forms.constants";
import {RequestError} from "../../core/types/request-error.types";
import {AuthRequestErrors} from "../../core/enums/request-errors.enums";


export const login$ = createEffect(
  (
    store$ = inject(Store<AppState>),
    actions$ = inject(Actions),
    authApiService = inject(AuthApiService)
  ) => {
    return actions$.pipe(
      ofType(LOGIN_ACTIONS.submit),
      withLatestFrom(store$.pipe(select(AuthFeature.selectLoginForm))),
      exhaustMap(([action, form]) => {
          if (form.isInvalid) {
            return of(CORE_ACTIONS.doNothing());
          }
          return authApiService.login(form.value)
            .pipe(
              map((response) => LOGIN_ACTIONS.success(response)),
              catchError((err, caught) => handleAuthError(err, AUTH_FORMS_IDS.login))
            )
        }
      )
    );
  },
  {functional: true}
);

export const register$ = createEffect(
  (
    store$ = inject(Store<AppState>),
    actions$ = inject(Actions),
    authApiService = inject(AuthApiService)
  ) => {
    return actions$.pipe(
      ofType(REGISTRATION_ACTIONS.submit),
      withLatestFrom(store$.pipe(select(AuthFeature.selectRegistrationForm))),
      exhaustMap(([action, form]) => {
          if (form.isInvalid) {
            return of(CORE_ACTIONS.doNothing());
          }
          return authApiService.register(form.value)
            .pipe(
              map((response) => REGISTRATION_ACTIONS.success(response)),
              catchError((err, caught) => handleAuthError(err, AUTH_FORMS_IDS.registration))
            )
        }
      )
    );
  },
  {functional: true}
);

export const onAuthSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    storage = inject(StorageService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(LOGIN_ACTIONS.success, REGISTRATION_ACTIONS.success),
      map(({token, me}) => {
          storage.setRecord(StorageKeys.authToken, token);
          router.navigateByUrl('/main/items');
          return PROFILE_ACTIONS.setMe({me})
        }
      )
    );
  },
  {functional: true, dispatch: false}
);

function handleAuthError(error: RequestError, formID: string): Action[] {
  const formErrors = error.validation?.map(({property, errorType}) => {
    const fieldID = `${formID}.${property}`;
    const error = {[errorType]: true};
    return new SetErrorsAction(fieldID, error);
  }) ?? [];

  if (error.errorType === AuthRequestErrors.invalidCredentials) {
    formErrors.push(new SetErrorsAction(formID, {[error.errorType]: true}))
  }
  return formErrors;
}
