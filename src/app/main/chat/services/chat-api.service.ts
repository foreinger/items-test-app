import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Message, Room} from "../types/chats.types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public initRoom(userId: number): Observable<Room> {
    return this.http.get<Room>(`${environment.apiUrl}/chat/${userId}`);
  }

  public getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.apiUrl}/chat`);
  }

  public getMessages(roomId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiUrl}/chat/messages/${roomId}`);
  }
}
