import { AuthEntity } from '@/models/entities/auth.entity';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly authKey = 'auth';

  getAuth(): AuthEntity | null {
    const value = sessionStorage.getItem(this.authKey);

    if (!value) {
      return null;
    }

    try {
      const auth = JSON.parse(value) as AuthEntity;

      return auth.token ? auth : null;
    } catch {
      return null;
    }
  }

  saveAuth(auth: AuthEntity): void {
    sessionStorage.setItem(this.authKey, JSON.stringify(auth));
  }

  clearAuth(): void {
    sessionStorage.removeItem(this.authKey);
  }
}
