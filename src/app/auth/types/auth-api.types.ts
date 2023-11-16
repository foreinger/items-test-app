import {User} from "../../user/types/user.types";

export type AuthResponse = {
  me: User,
  token: string
}
