import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
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
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, payload)
      .pipe(catchError((err: HttpErrorResponse) => throwError(() => err.error)));
  }

  public register(payload: RegistrationForm): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, payload)
      .pipe(catchError((err: HttpErrorResponse) => throwError(() => err.error)));
  }
}
