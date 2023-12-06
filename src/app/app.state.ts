import {Action, ActionReducer} from '@ngrx/store';
import {AUTH_INITIAL_STATE, AuthState} from "./auth/store/auth.state";
import {CORE_ACTIONS} from "./core/store/core.actions";

export interface AppState {
  auth: AuthState,
}

export const APP_INITIAL_STATE: AppState = {
  auth: AUTH_INITIAL_STATE,
}

export function clearStateMetaReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState | undefined, action: Action) => {
    if (action.type === CORE_ACTIONS.clearAppState.type) {
      state = APP_INITIAL_STATE;
    }
    return reducer(state, action);
  };
}
