import { AuthSessionService } from '@/core/services/auth-session.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {
  constructor(
    private authSessionService: AuthSessionService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    return this.authSessionService.getAuth()
      ? this.router.createUrlTree(['/seleccionar-empresa'])
      : true;
  }
}
