import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() {
  }

  public static matchPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.get('password')?.value === control.get('passwordConfirm')?.value) {
        control.get('passwordConfirm')?.setErrors(null);
      } else {
        control.get('passwordConfirm')?.setErrors({noMatch: true});
      }
      return null;
    };
  }
}
