import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {AuthFeature} from "../../store/auth.state";
import {AppState} from "../../../app.state";
import {REGISTRATION_ACTIONS} from "../../store/auth.actions";
import {FormGroupState, NgrxFormsModule} from "ngrx-forms";
import {NgrxFormErrorStateMatcher} from "../../../core/material/error-state-matcher";
import {Observable} from "rxjs";
import {RegistrationForm} from "../../types/forms.types";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss', '../../auth.page.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe,
    NgrxFormsModule,
    FormsModule,
    NgrxFormErrorStateMatcher,
  ]
})
export default class RegistrationComponent {

  public form$: Observable<FormGroupState<RegistrationForm>> = this.store.select(AuthFeature.selectRegistrationForm);

  constructor(
    private store: Store<AppState>,
  ) {
  }

  public submit() {
    this.store.dispatch(REGISTRATION_ACTIONS.submit())
  }
}
