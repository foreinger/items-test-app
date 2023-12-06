import {createActionGroup, emptyProps} from '@ngrx/store';


export const CORE_ACTIONS = createActionGroup({
  source: 'Core Actions',
  events: {
    clearAppState: emptyProps(),
    doNothing: emptyProps(),
  },
});
