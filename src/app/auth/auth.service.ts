import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IFbAuthResponse, ISingInForm, ISingUpForm } from './auth.types';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public errorLogin$: Subject<string> = new Subject<string>();
  public errorSignUp$: Subject<string> = new Subject<string>();

  get token(): string | null {
    // @ts-ignore
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();

      return null;
    }

    return localStorage.getItem('fb-token');
  }

  constructor(private http: HttpClient) {}

  private static setToken(response: IFbAuthResponse | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

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
      .post<IFbAuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        singInForm,
      )
      .pipe(tap(AuthService.setToken), catchError(this.handleErrorLogin.bind(this)));
  }

  public logout(): void {
    AuthService.setToken(null);
  }

  public signUp(singUpForm: ISingUpForm): Observable<unknown> {
    singUpForm.returnSecureToken = true;

    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
        singUpForm,
      )
      .pipe(catchError(this.handleErrorSignUp.bind(this)));
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }
}
