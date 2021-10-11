import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  IConfirmEmailResp,
  ILoginResp,
  ISignUpResp,
  ILoginForm,
  ISingUpForm,
} from '../../auth/auth.types';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public errorLogin$: Subject<string> = new Subject<string>();
  public errorSignUp$: Subject<string> = new Subject<string>();

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp') as string);
    if (new Date() < expDate) return localStorage.getItem('fb-token');
    this.logout();

    return null;
  }

  private static setToken(response: ILoginResp | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  constructor(private http: HttpClient, private router: Router) {}

  public login(singInForm: ILoginForm): Observable<unknown> {
    return this.http
      .post<ILoginResp>(`accounts:signInWithPassword`, {
        ...singInForm,
        returnSecureToken: true,
      })
      .pipe(tap(AuthService.setToken), catchError(this.handleErrorLogin.bind(this)));
  }

  public signUp(singUpForm: ISingUpForm): Observable<ISignUpResp | Error> {
    return this.http
      .post<ISignUpResp>(`accounts:signUp`, { ...singUpForm, returnSecureToken: true })
      .pipe(catchError(this.handleErrorSignUp.bind(this)));
  }

  public logout(): void {
    AuthService.setToken(null);
  }

  public confirmUserEmail(idToken: string): Observable<IConfirmEmailResp> {
    return this.http.post<IConfirmEmailResp>(`accounts:sendOobCode`, {
      requestType: 'VERIFY_EMAIL',
      idToken,
    });
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
}
