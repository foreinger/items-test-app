import {createActionGroup, props} from '@ngrx/store';
import {User} from "../types/user.types";
import {Pagination} from "../../../core/types/pagination.types";
import {PaginationParamsDto} from "../../../core/models/pagination.models";


export const USERS_ACTIONS = createActionGroup({
  source: 'Users page',
  events: {
    get: props<{ paginationData?: PaginationParamsDto }>(),
    success: props<{ usersPage: Pagination<User> }>(),
    error: props<{ error: string }>(),
  },
});

