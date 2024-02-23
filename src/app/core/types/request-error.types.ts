import {ValidationError} from "./validation-error.types";

export type RequestError = {
  errorType: string,
  statusCode: number,
  validation?: ValidationError[],
}


