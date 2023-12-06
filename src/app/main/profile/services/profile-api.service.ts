import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../users/types/user.types";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getMe(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/me`);
  }
}
