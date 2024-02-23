import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../types/user.types';
import { Pagination } from '../../../core/types/pagination.types';

export const USERS_ACTIONS = createActionGroup({
  source: 'Users page',
  events: {
    get: emptyProps(),
    success: props<{ usersPage: Pagination<User> }>(),
    error: props<{ error: string }>(),
  },
});
