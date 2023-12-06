import {Directive, Host, Input, Optional} from '@angular/core';
import {MatChipInput} from '@angular/material/chips';
import {MatInput} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {FormControlState} from 'ngrx-forms';

@Directive({
  selector: '[ngrxFormControlState]',
  standalone: true
})
export class NgrxFormErrorStateMatcher {
  constructor(
    @Host() @Optional() private input: MatInput,
    @Host() @Optional() private select: MatSelect,
    @Host() @Optional() private chipInput: MatChipInput,
  ) {
  }

  @Input() set ngrxFormControlState(state: FormControlState<any>) {
    const errorsAreShown = state.isInvalid && (state.isTouched || state.isSubmitted);

    if (this.input) {
      this.input.errorState = errorsAreShown;
      this.input.stateChanges.next();
    }

    if (this.select) {
      this.select.errorState = errorsAreShown;
      this.select.stateChanges.next();
    }
  }
}
