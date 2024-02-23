import {FormGroupState, setErrors, updateGroup, validate} from "ngrx-forms";
import {LoginForm, RegistrationForm} from "../types/forms.types";
import {required} from "ngrx-forms/validation";
import {passwordsMatchValidator} from "../../core/store/core.validators";

export const loginFormValidator = (form: FormGroupState<LoginForm>): FormGroupState<LoginForm> => {
  // init validation function
  const validatorFn = updateGroup<LoginForm>({
      username: validate(required),
      password: validate(required)
    }
  );
  // reset errors before each validation check
  return validatorFn(setErrors(form, {}));
}

export const registrationFormValidator = (form: FormGroupState<RegistrationForm>): FormGroupState<RegistrationForm> => {
  // init validation function
  const validatorFn = updateGroup<RegistrationForm>({
      username: validate(required),
      password: validate(required),
      passwordConfirm: passwordsMatchValidator
    }
  )
  // reset errors before each validation check
  return validatorFn(setErrors(form, {}));
};


