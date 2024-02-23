export enum AuthRequestErrors {
  invalidToken = 'invalidSignature',
  expiredToken = 'jwtExpired',
  userNotFound = 'userNotFound',
  userAlreadyExist = 'userAlreadyExist',
  invalidCredentials = 'invalidCredentials',
  invalidData = 'invalidData',
  unknown = 'unknown',
}
