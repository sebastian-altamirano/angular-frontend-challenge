import { EnterpriseEntity } from '@/models/entities/enterprise.entity';
import { EnterprisesRepository } from '@/models/repositories/enterprises.repository';
import { EnterprisesResponse } from '@/models/responses/enterprises.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnterprisesService implements EnterprisesRepository {
  constructor(private http: HttpClient) {}

  getAll(): Observable<EnterpriseEntity[]> {
    return this.http
      .get<EnterprisesResponse>(`${environment.baseUrl}/enterprises`)
      .pipe(map((response) => response.enterprises));
  }
}
