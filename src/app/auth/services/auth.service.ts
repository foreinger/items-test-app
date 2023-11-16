import {Injectable} from '@angular/core';
import {LoginDto, RegistrationDto} from "../types/auth-dto.types";
import {Observable, tap} from "rxjs";
import {AuthResponse} from "../types/auth-api.types";
import {AuthApiService} from "./auth-api.service";
import {StorageService} from "../../core/services/storage.service";
import {StorageKeys} from "../../core/enums/storage-keys.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: AuthApiService,
    private storage: StorageService,
  ) {
  }

  public login(payload: LoginDto): Observable<AuthResponse> {
    return this.api.login(payload).pipe(tap(this.storeAuthData.bind(this)))
  }

  public register(payload: RegistrationDto): Observable<AuthResponse> {
    return this.api.register(payload).pipe(tap(this.storeAuthData.bind(this)))
  }

  private storeAuthData({me, token}: AuthResponse): void {
    this.storage.setRecord(StorageKeys.authToken, token);
    this.storage.setRecord(StorageKeys.me, me);
  }
}
