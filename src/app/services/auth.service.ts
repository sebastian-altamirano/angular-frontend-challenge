import { AuthEntity } from '@/models/entities/auth.entity';
import { AuthRepository } from '@/models/repositories/auth.repository';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthRepository {
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<AuthEntity> {
    return this.http.post<AuthEntity>(`${environment.baseUrl}/auth/sign-in`, {
      email,
      password,
    });
  }
}
