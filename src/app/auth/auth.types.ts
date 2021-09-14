export interface ISingInForm {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface ISingUpForm extends ISingInForm {
  login: string;
}

export interface IFbAuthResponse {
  displayName: string;
  email: string;
  idToken: string;
  kind: string;
  localId: string;
  registered: boolean;
  expiresIn: string;
}
