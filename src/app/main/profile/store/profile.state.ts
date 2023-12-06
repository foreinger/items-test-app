import {createFeature, createReducer, on} from '@ngrx/store';
import {User} from "../../users/types/user.types";
import {PROFILE_ACTIONS} from "./profile.actions";

export interface ProfileState {

  me: User | null;
}

export const PROFILE_INITIAL_STATE: ProfileState = {
  me: null,
}

const reducer = createReducer(
  PROFILE_INITIAL_STATE,
  on(PROFILE_ACTIONS.setMe,
    (state, {me}) => ({
      ...state,
      me
    })
  ),
)

export const ProfileFeature = createFeature({
  name: 'Profile Feature', reducer,
})
