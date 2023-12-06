import {FormControlState, FormGroupState, setErrors, validate} from "ngrx-forms";
import {required} from "ngrx-forms/validation";

export const passwordsMatchValidator = (state: FormControlState<string>, parentState: FormGroupState<{ password: string }>): FormControlState<string> => {
  if (state.value === parentState.value.password) {
    return validate(state, required);
  } else {
    return setErrors(state, [{
      noMatch: true,
    }]);
  }
};
