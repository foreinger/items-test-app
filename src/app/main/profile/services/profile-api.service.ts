import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../users/types/user.types';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponsePayload } from '../../../core/types/response-payload.types';

@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  constructor(private http: HttpClient) {}

  public getMe(): Observable<User> {
    return this.http.get<ResponsePayload<User>>(`${environment.apiUrl}/users/me`).pipe(map((res) => res.data));
  }
}
