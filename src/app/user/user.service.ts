import {Injectable} from '@angular/core';
import {User} from "./types/user.types";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private me: User | null = null;

  constructor() {
  }

  public set setMe(user: User | null) {
    this.me = user;
  }

  public get getMe(): User | null {
    return this.me;
  }

  public resetMe() {
    this.me = null;
  }
}
