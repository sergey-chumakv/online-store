import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IChangeUserDataResp, IGetUserDataResp } from './users.types';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(private http: HttpClient) {}

  public getUserData(idToken: string | null): Observable<IGetUserDataResp> {
    return this.http.post<IGetUserDataResp>(`accounts:lookup`, { idToken });
  }

  public changeUserData(idToken: string, userName: string): Observable<IChangeUserDataResp> {
    return this.http.post<IChangeUserDataResp>(`accounts:update`, {
      idToken,
      displayName: userName,
      returnSecureToken: false,
    });
  }
}
