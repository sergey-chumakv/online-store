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
  public error$: Subject<string> = new Subject<string>();

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

  private handleError(error: HttpErrorResponse): Observable<Error> {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
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
      .pipe(tap(AuthService.setToken), catchError(this.handleError.bind(this)));
  }

  public logout(): void {
    AuthService.setToken(null);
  }

  public signUp(singUpForm: ISingUpForm): Observable<unknown> {
    singUpForm.returnSecureToken = true;

    return this.http.post('', singUpForm);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }
}
