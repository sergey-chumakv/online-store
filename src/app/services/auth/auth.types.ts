export interface ISingInForm {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface ISingUpForm extends ISingInForm {
  login: string;
}

export interface IAuthSignUpResponse {
  email: string;
  idToken: string;
  localId: string;
  expiresIn: string;
  refreshToken: string;
}

export interface IAuthLoginResponse extends IAuthSignUpResponse {
  registered: boolean;
}

export interface IAuthConfirmationResponse {
  email: string;
}

interface IProviderUserInfo {
  displayName: string;
  email: string;
  federatedId: string;
  providerId: string;
  rawId: string;
}

export interface IUpdateProfileResponse {
  displayName: string;
  email: string;
  emailVerified: boolean;
  kind: string;
  localId: string;
  passwordHash: string;
  providerUserInfo: IProviderUserInfo[];
}

export interface IUserData {
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  lastLoginAt: string;
  lastRefreshAt: string;
  localId: string;
  passwordHash: string;
  passwordUpdatedAt: number;
  validSince: string;
  providerUserInfo: IProviderUserInfo[];
}

export interface IAccountDataResponse {
  kind: string;
  users: IUserData[];
}
