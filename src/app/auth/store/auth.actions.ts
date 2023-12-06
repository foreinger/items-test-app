import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {AuthResponse} from "../types/api.types";


export const LOGIN_ACTIONS = createActionGroup({
  source: 'Login page',
  events: {
    submit: emptyProps(),
    success: props<AuthResponse>(),
    error: props<{ error: string }>(),
  },
});

export const REGISTRATION_ACTIONS = createActionGroup({
  source: 'Registration page',
  events: {
    submit: emptyProps(),
    success: props<AuthResponse>(),
    error: props<{ error: string }>(),
  },
});
