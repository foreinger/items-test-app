import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {StorageKeys} from "../../../core/enums/storage-keys.enum";
import {StorageService} from "../../../core/services/storage.service";
import {Observable} from "rxjs";
import {Message, MessageForm, Room} from "../types/chats.types";
import {ChatEvents} from "../enums/chats-events.enums";
import {Socket} from "socket.io-client/build/esm/socket";

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {

  public socket: Socket | undefined;

  constructor(
    private storage: StorageService,
  ) {
  }

  private get token(): string {
    return `Bearer ${this.storage.getRecord(StorageKeys.authToken)}`;
  }

  public initSocketConnection(): void {
    const options = {auth: {token: this.token}};
    this.socket = io('http://localhost:3000/chat', options);
  }


  public joinRoom(roomId: number): Observable<any> {
    return new Observable<any>((subscriber) => {
      this.socket?.on(ChatEvents.roomJoined, (response: any) => {
        subscriber.next(response);
      });

      this.socket?.on(ChatEvents.roomLeft, (response: any) => {
        subscriber.complete();
        subscriber.unsubscribe();
      });

      this.socket?.on(ChatEvents.exception, (exception) => {
        subscriber.error(exception);
      });

      this.socket?.on(ChatEvents.disconnect, (reason) => {
        subscriber.complete();
      });

      this.socket?.emit(ChatEvents.joinRoom, {roomId})
    })
  }

  public leaveRoom(roomId: number): Observable<any> {
    return new Observable<any>((subscriber) => {
      this.socket?.on(ChatEvents.roomLeft, (response: any) => {
        subscriber.complete();
      });

      this.socket?.on(ChatEvents.disconnect, (reason) => {
        subscriber.complete();
      });

      this.socket?.emit(ChatEvents.leaveRoom, {roomId})
    })
  }

  public listenToRoomsUpdate(): Observable<Room> {
    return new Observable((subscriber) => {

      this.socket?.on(ChatEvents.roomUpdated, (room: Room) => {
        subscriber.next(room)
      });


      this.socket?.on(ChatEvents.disconnect, (reason) => {
        subscriber.complete();
      });
    })
  };

  public listenToMessages(): Observable<Message> {
    return new Observable((subscriber) => {
      this.socket?.on(ChatEvents.messageSent, (message: Message) => {
        subscriber.next(message)
      });

      this.socket?.on(ChatEvents.disconnect, (reason) => {
        subscriber.complete();
      });
    })
  };

  public sendMessage(message: MessageForm) {
    this.socket?.emit(ChatEvents.sendMessage, message);
  }


  public closeSocketConnection(): void {
    this.socket?.disconnect();
    this.socket = undefined;
  }
}
