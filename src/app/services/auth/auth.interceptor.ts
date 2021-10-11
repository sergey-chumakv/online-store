import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private baseUrl = 'https://identitytoolkit.googleapis.com/v1/';

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const params: HttpParams = request.params.append('key', environment.apiKey);
    const cloneReq = request.clone({
      url: `${this.baseUrl}${request.url}`,
      params,
    });

    return next.handle(cloneReq);
  }
}
