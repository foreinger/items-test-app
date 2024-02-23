import {createFeature, createReducer} from '@ngrx/store';
import {createFormGroupState, FormGroupState, onNgrxForms, onNgrxFormsAction, SetErrorsAction, SetValueAction} from "ngrx-forms";
import {LoginForm, RegistrationForm} from "../types/forms.types";
import {AUTH_FORMS_IDS, LOGIN_FORM_DEFAULT_VALUE, REGISTRATION_FORM_DEFAULT_VALUE} from "../constants/forms.constants";
import {loginFormValidator, registrationFormValidator} from "./auth.validators";

export interface AuthState {

  loginForm: FormGroupState<LoginForm>;
  registrationForm: FormGroupState<RegistrationForm>;
}

export const AUTH_INITIAL_STATE: AuthState = {
  loginForm: loginFormValidator(createFormGroupState<LoginForm>(AUTH_FORMS_IDS.login, LOGIN_FORM_DEFAULT_VALUE)),
  registrationForm: registrationFormValidator(createFormGroupState<RegistrationForm>(AUTH_FORMS_IDS.registration, REGISTRATION_FORM_DEFAULT_VALUE))
}

const reducer = createReducer(
  AUTH_INITIAL_STATE,
  onNgrxForms(),
  onNgrxFormsAction(SetValueAction, (state, action) => authFormsValidators(state, action)),
  // on(CORE_ACTIONS.setScreenReaderState,
  //     (state, {screenReaderOn}) => ({
  //         ...state,
  //         screenReaderOn
  //     })
  // ),
)

const authFormsValidators = (state: AuthState, action: any) => ({
  ...state,
  loginForm: loginFormValidator(state.loginForm),
  registrationForm: registrationFormValidator(state.registrationForm),
})

export const AuthFeature = createFeature({
  name: 'Auth Feature', reducer,
})



