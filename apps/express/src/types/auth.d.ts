export interface UserTokenData {
  id: string;
  role: string;
}

export interface AccessTokenData {
  id: string;
  role: string;
}

export interface RefreshTokenData {
  id: string;
  refreshTokenVersion: number;
}
