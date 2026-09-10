import { AuthSessionService } from '@/core/services/auth-session.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate, CanLoad {
  constructor(
    private authSessionService: AuthSessionService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    return this.canAccess();
  }

  canLoad(): boolean | UrlTree {
    return this.canAccess();
  }

  private canAccess(): boolean | UrlTree {
    return this.authSessionService.getAuth()
      ? this.router.createUrlTree(['/seleccionar-empresa'])
      : true;
  }
}
