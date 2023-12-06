import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CommonModule, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {AuthFeature} from "../../store/auth.state";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.state";
import {NgrxFormsModule} from "ngrx-forms";
import {LOGIN_ACTIONS} from "../../store/auth.actions";
import {NgrxFormErrorStateMatcher} from "../../../core/material/error-state-matcher";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../auth.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    NgrxFormsModule,
    FormsModule,
    NgrxFormErrorStateMatcher,
  ]
})
export default class LoginComponent {

  public form$ = this.store.select(AuthFeature.selectLoginForm);

  constructor(
    private store: Store<AppState>,
  ) {
  }

  public submit() {
    this.store.dispatch(LOGIN_ACTIONS.submit())
  }
}
