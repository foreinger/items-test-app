import {HttpErrorResponse, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {inject} from "@angular/core";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";

export function ErrorHandlerInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
  const router = inject(Router);
  const storage = inject(StorageService);

  return next(request)
    .pipe(
      catchError((err, caught) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log(err.status);
              storage.clearStorage();
              router.navigateByUrl('/auth/login');
            }
          }
          return throwError(() => err)
        }
      )
    );
}
