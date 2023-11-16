import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {Router, RouterLink} from "@angular/router";
import {LoginForm} from "../../types/auth-dto.types";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../auth.page.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatToolbarModule,
    RouterLink
  ]
})
export default class LoginComponent {


  public form: LoginForm = this.fb.group<LoginForm['controls']>({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue())
        .subscribe((res) => this.router.navigateByUrl('/items'))
    }
  }

}
