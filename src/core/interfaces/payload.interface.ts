export interface PartialUserJwtPayload {
  uid: number;
}

export interface UserJwtPayload extends PartialUserJwtPayload {
  uid: number;
  iat: number;
  exp: number;
}
