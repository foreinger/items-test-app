import {createFeature, createReducer, on} from '@ngrx/store';
import {User} from "../types/user.types";
import {Pagination} from "../../../core/types/pagination.types";
import {USERS_ACTIONS} from "./users.actions";

export interface UsersState {

  usersPage: Pagination<User> | null;
}

export const USERS_INITIAL_STATE: UsersState = {
  usersPage: null,
}

const reducer = createReducer(
  USERS_INITIAL_STATE,
  on(USERS_ACTIONS.success,
    (state, {usersPage}) => ({
      ...state,
      usersPage
    })
  ),
)

export const UsersFeature = createFeature({
  name: 'Users Feature', reducer,
})
