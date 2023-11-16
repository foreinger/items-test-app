import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginDto, RegistrationDto} from "../types/auth-dto.types";
import {Observable} from "rxjs";
import {AuthResponse} from "../types/auth-api.types";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public login(payload: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, payload);
  }

  public register(payload: RegistrationDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, payload);
  }
}
