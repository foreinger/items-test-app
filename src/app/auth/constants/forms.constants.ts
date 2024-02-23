import {LoginForm, RegistrationForm} from "../types/forms.types";

export const AUTH_FORMS_IDS = {
  login: 'LOGIN_FORM_ID',
  registration: 'REGISTRATION_FORM_ID',
}

export const LOGIN_FORM_DEFAULT_VALUE: LoginForm = {
  username: '',
  password: '',
}

export const REGISTRATION_FORM_DEFAULT_VALUE: RegistrationForm = {
  username: '',
  password: '',
  passwordConfirm: '',
}
