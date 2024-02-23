import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthFeature } from '../../store/auth.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { LOGIN_ACTIONS } from '../../store/auth.actions';
import { NgrxFormErrorStateMatcher } from '../../../core/material/error-state-matcher';
import { Observable } from 'rxjs';
import { LoginForm } from '../../types/forms.types';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
  ],
})
export default class LoginComponent {
  public form$: Observable<FormGroupState<LoginForm>> = this.store.select(AuthFeature.selectLoginForm);

  constructor(
    private store: Store<AppState>,
    public route: ActivatedRoute,
  ) {}

  public switchPasswordMode(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  public submit() {
    this.store.dispatch(LOGIN_ACTIONS.submit());
  }
}
