import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  IAuthConfirmationResponse,
  IAuthLoginResponse,
  IAuthSignUpResponse,
  ISingInForm,
  ISingUpForm,
  IAccountDataResponse,
  IUpdateProfileResponse,
} from './auth.types';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static setToken(response: IAuthLoginResponse | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private static verifiedAccount(response: IAccountDataResponse): void {
    if (response) {
      localStorage.setItem('isVerifiedAccount', String(response.users[0].emailVerified));
    }
  }
  public errorLogin$: Subject<string> = new Subject<string>();
  public errorSignUp$: Subject<string> = new Subject<string>();

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp') as string);
    if (new Date() < expDate) return localStorage.getItem('fb-token');
    this.logout();

    return null;
  }

  get isVerifiedAccount(): boolean {
    return JSON.parse(localStorage.getItem('isVerifiedAccount') as string);
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  constructor(private http: HttpClient) {}

  private handleErrorLogin(error: HttpErrorResponse): Observable<Error> {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.errorLogin$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.errorLogin$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.errorLogin$.next('Email not found');
        break;
    }

    return throwError(error);
  }

  private handleErrorSignUp(error: HttpErrorResponse): Observable<Error> {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.errorSignUp$.next('Invalid email');
        break;
      case 'EMAIL_EXISTS':
        this.errorSignUp$.next('Email exists');
        break;
      case 'OPERATION_NOT_ALLOWED':
        this.errorSignUp$.next('Operation not allowed');
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        this.errorSignUp$.next('Too many attempts try later');
        break;
    }

    return throwError(error);
  }

  public login(singInForm: ISingInForm): Observable<unknown> {
    singInForm.returnSecureToken = true;

    return this.http
      .post<IAuthLoginResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        singInForm,
      )
      .pipe(tap(AuthService.setToken), catchError(this.handleErrorLogin.bind(this)));
  }

  public signUp(singUpForm: ISingUpForm): Observable<IAuthSignUpResponse | Error> {
    singUpForm.returnSecureToken = true;

    return this.http
      .post<IAuthSignUpResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
        singUpForm,
      )
      .pipe(catchError(this.handleErrorSignUp.bind(this)));
  }

  public logout(): void {
    AuthService.setToken(null);
  }

  public confirmationEmail(idToken: string): Observable<IAuthConfirmationResponse> {
    return this.http.post<IAuthConfirmationResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.apiKey}`,
      { requestType: 'VERIFY_EMAIL', idToken },
    );
  }

  public getUserData(idToken: string | null): Observable<IAccountDataResponse> {
    return this.http
      .post<IAccountDataResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`,
        { idToken },
      )
      .pipe(tap(AuthService.verifiedAccount));
  }

  public updateUserProfile(idToken: string, userName: string): Observable<IUpdateProfileResponse> {
    const body = {
      idToken,
      displayName: userName,
      returnSecureToken: false,
    };

    return this.http.post<IUpdateProfileResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`,
      body,
    );
  }
}
