import {FormControlState, FormGroupState, setErrors, validate} from "ngrx-forms";
import {required} from "ngrx-forms/validation";
import {RegistrationForm} from "../../auth/types/forms.types";

export const passwordsMatchValidator = (state: FormControlState<string>, parentState: FormGroupState<RegistrationForm>): FormControlState<string> => {
  if (state.value === parentState.value.password) {
    return validate(state, required);
  } else {
    return setErrors(state, [{
      noMatch: true,
    }]);
  }
};

declare module 'ngrx-forms/src/state' {
  interface ValidationErrors {
    noMatch?: boolean;
    invalidData?: boolean;
    userAlreadyExist?:boolean;
    invalidCredentials?:boolean;
    isLowercase?:boolean;
  }
}
