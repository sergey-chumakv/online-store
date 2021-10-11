interface IProviderUserInfo {
  displayName: string;
  email: string;
  federatedId: string;
  providerId: string;
  rawId: string;
}

export interface IChangeUserDataResp {
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

export interface IGetUserDataResp {
  kind: string;
  users: IUserData[];
}
