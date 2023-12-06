import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pagination, PaginationParams} from "../../../core/types/pagination.types";
import {User} from "../types/user.types";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getAll(paginationData?: PaginationParams): Observable<Pagination<User>> {
    return this.http.get<Pagination<User>>(`${environment.apiUrl}/users`, {params: paginationData});
  }
}
