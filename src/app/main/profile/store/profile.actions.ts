import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from "../../users/types/user.types";


export const PROFILE_ACTIONS = createActionGroup({
  source: 'Profile page',
  events: {
    getMe: emptyProps(),
    setMe: props<{ me: User }>(),
    error: props<{ error: string }>(),
    logOut: emptyProps(),
  },
});

