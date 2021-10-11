export interface ILoginForm {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface ISingUpForm extends ILoginForm {
  login: string;
}

export interface ISignUpResp {
  email: string;
  idToken: string;
  localId: string;
  expiresIn: string;
  refreshToken: string;
}

export interface ILoginResp extends ISignUpResp {
  registered: boolean;
}

export interface IConfirmEmailResp {
  email: string;
}
