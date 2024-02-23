import {Directive, Host, Input, OnChanges, Optional, SimpleChanges} from '@angular/core';
import {MatChipInput} from '@angular/material/chips';
import {MatInput} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {FormControlState, NgrxFormDirective} from 'ngrx-forms';
import {ValidationErrors} from "ngrx-forms/src/state";

@Directive({
  selector: '[ngrxFormControlState]',
  standalone: true
})
export class NgrxFormErrorStateMatcher implements OnChanges {

  @Input()
  public groupErrors: ValidationErrors | undefined;
  private controlState: FormControlState<any> | undefined;

  constructor(
    @Host() @Optional() private input: MatInput,
    @Host() @Optional() private select: MatSelect,
    @Host() @Optional() private chipInput: MatChipInput,
    @Host() @Optional() private formGroup: NgrxFormDirective<any>,
  ) {
  }

  @Input() set ngrxFormControlState(state: FormControlState<any>) {
    this.controlState = state;
    this.updateInputState()
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (!changes?.groupErrors?.currentValue) return;
    this.updateInputState()
  }

  public updateInputState(): any {
    // condition to show an error
    const errorsAreShown = this.controlState?.isInvalid && (this.controlState?.isTouched || this?.controlState.isSubmitted);
    // check for custom error that was manually set for group (they do not have an underscore at the beginning)
    const customGroupError = Object.keys(this.groupErrors ?? {}).some((er) => /^(?!_).*/g.test(er))

    if (this.input) {
      this.input.errorState = errorsAreShown || customGroupError;
      this.input.stateChanges.next();
    }

    if (this.select) {
      this.select.errorState = errorsAreShown ?? false;
      this.select.stateChanges.next();
    }
  }
}
