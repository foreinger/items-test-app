import {User} from "../../main/users/types/user.types";

export type AuthResponse = {
  me: User,
  token: string
}
