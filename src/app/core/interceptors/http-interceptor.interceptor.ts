import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthSessionService } from '@/core/services/auth-session.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private authSessionService: AuthSessionService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const auth = this.authSessionService.getAuth();
    const isSignIn =
      request.method === 'POST' && request.url.endsWith('/auth/sign-in');

    if (!auth || isSignIn) {
      return next.handle(request);
    }

    return next.handle(
      request.clone({
        setHeaders: { Authorization: `Bearer ${auth.token}` },
      })
    );
  }
}
