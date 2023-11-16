import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../services/storage.service";
import {inject} from "@angular/core";
import {StorageKeys} from "../enums/storage-keys.enum";

export function AuthInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
  const storage = inject(StorageService);
  const token = storage.getRecord<string>(StorageKeys.authToken);
  const requestUpdate = {setHeaders: {Authorization: `Bearer ${token}`}};
  const clone = request.clone(requestUpdate);
  return next(clone);
}
