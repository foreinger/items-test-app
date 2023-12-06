import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthResponse} from "../types/api.types";
import {environment} from "../../../environments/environment";
import {LoginForm, RegistrationForm} from "../types/forms.types";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public login(payload: LoginForm): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, payload);
  }

  public register(payload: RegistrationForm): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, payload);
  }
}
