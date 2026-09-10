import { AuthSessionService } from '@/core/services/auth-session.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard implements CanActivateChild, CanLoad {
  constructor(
    private authSessionService: AuthSessionService,
    private router: Router
  ) {}

  canActivateChild(): boolean | UrlTree {
    return this.canAccess();
  }

  canLoad(): boolean | UrlTree {
    return this.canAccess();
  }

  private canAccess(): boolean | UrlTree {
    return this.authSessionService.getAuth()
      ? true
      : this.router.createUrlTree(['/']);
  }
}
