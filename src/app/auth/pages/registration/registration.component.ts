import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {RegistrationForm} from "../../types/auth-dto.types";
import {ValidatorsService} from "../../../core/services/validators.service";
import {AuthService} from "../../services/auth.service";

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
    RouterLink
  ]
})
export default class RegistrationComponent {

  public form: RegistrationForm = this.fb.group<RegistrationForm['controls']>({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    passwordConfirm: this.fb.control('', [Validators.required]),
  }, {validators: [ValidatorsService.matchPassword()]});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  submit() {
    if (this.form.valid) {
      this.authService.register(this.form.getRawValue())
        .subscribe((res) => this.router.navigateByUrl('/items'))
    }
  }

}
