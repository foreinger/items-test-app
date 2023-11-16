import {FormModel} from "ngx-mf";

export type LoginDto = {
  username: string | null,
  password: string | null
};

export type RegistrationDto = {
  passwordConfirm: string | null,
} & LoginDto;


export type LoginForm = FormModel<LoginDto>
export type RegistrationForm = FormModel<RegistrationDto>
