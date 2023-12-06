import {updateGroup, validate} from "ngrx-forms";
import {LoginForm, RegistrationForm} from "../types/forms.types";
import {required} from "ngrx-forms/validation";
import {passwordsMatchValidator} from "../../core/store/core.validators";

export const loginFormValidator = updateGroup<LoginForm>({
  username: validate(required),
  password: validate(required),
});

export const registrationFormValidator = updateGroup<RegistrationForm>({
  username: validate(required),
  password: validate(required),
  passwordConfirm: passwordsMatchValidator
});


