import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Message, Room } from '../types/chats.types';
import { map, Observable } from 'rxjs';
import { ResponsePayload } from '../../../core/types/response-payload.types';

@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  constructor(private http: HttpClient) {}

  public initRoom(userId: string | null): Observable<Room> {
    return this.http.get<ResponsePayload<Room>>(`${environment.apiUrl}/chat/${userId}`).pipe(map((res) => res.data));
  }

  public getRooms(): Observable<Room[]> {
    return this.http.get<ResponsePayload<Room[]>>(`${environment.apiUrl}/chat`).pipe(map((res) => res.data));
  }

  public getMessages(roomId: string | null): Observable<Message[]> {
    return this.http
      .get<ResponsePayload<Message[]>>(`${environment.apiUrl}/chat/messages/${roomId}`)
      .pipe(map((res) => res.data));
  }
}
